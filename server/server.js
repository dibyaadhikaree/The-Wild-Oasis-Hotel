const dotenv = require("dotenv");

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

const mongoose = require("mongoose");

const port = process.env.PORT;

const db = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

//Connecting to database

mongoose.connect(db).then(() => {
  console.log("Connected to database");
});

//Starting the server
const server = app.listen(port, () => {
  console.log(`Server started on Port : ${port} `);
});
