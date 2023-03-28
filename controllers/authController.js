const userModel = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("./../helpers/validation");

const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res, next) => {
  try {
    const id = uuidv4();
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    const { email, lastName, firstName, password } = req.body;
    if (!validateEmail(email)) throw new Error("Invalid Email");

    const hashPassword = await bcrypt.hash(password, 12);
    const createdAt = Math.floor(new Date() / 1000);

    const userDetails = {
      firstName,
      lastName,
      createdAt,
      id,
      password: hashPassword,
      email,
    };
    const rowCount = await userModel.saveUser(userDetails);
    if (rowCount) {
      res.status(201).json({
        status: "success",
        token,
        user: {
          email,
          id,
          firstName,
          lastName,
        },
      });
    } else if (email) {
      res.status(403).json({
        status: "fail",
        message: "User Already exist",
      });
    } else {
      throw new Error("Email required");
    }
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) throw new Error("Invalid Email");
    const user = await userModel.getUser({ email });
    console.log(user);
    if (user) {
      const id = user.id;
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      delete user.password;
      delete user.meta;
      delete user.phone;
      delete user.updatedAt;
      delete user.createdAt;

      //   console.log(isPasswordMatch);

      if (isPasswordMatch) {
        const token = jwt.sign({ id }, process.env.JWT_SECRET);
        res.status(201).json({
          status: "success",
          token,
          user,
        });
      } else {
        res.status(403).json({
          status: "fail",
          message: "Invalid Email or Password",
        });
      }
    } else {
      res.status(503).json({
        status: "fail",
        message: "Invalid Email or Password",
      });
    }
  } catch (e) {
    res.status(401).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

exports.verifyToken = async (req, res, next) => {
  req.user = {};
  const token = req.headers.token;
  console.log(token);
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {}
  if (decoded) {
    const id = decoded.id;
    const user = await userModel.getUser({ id: id });
    if (user) {
      delete user.password;
      req.user = user;
    }
  }
  return next();
};

exports.protect = (req, res, next) => {
  if (Object.keys(req.user).length) {
    return next();
  }
  return res.status(401).json({
    status: "fail",
    message: "Login required",
  });
};

exports.getUserDetail = (req, res, next) => {
  const { email, firstName, lastName } = req.user;
  res.status(200).json({ email, firstName, lastName });
};
