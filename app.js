const express = require("express");
const morgan = require("morgan");
const dotenv=require('dotenv')

dotenv.config({ path: './config.env' });


const app = express();

const routes = require("./routes");

// app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);

const port=process.env.PORT

app.listen(port, () => console.log(`server listening at port ${port}....`));
