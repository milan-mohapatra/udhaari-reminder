require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("../config/db.js");
const { createCLITimeStamps } = require("./utils/time.util.js");

const app = express();
const PORT = process.env.PORT || 3031;

app.use(express.json());
app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({"message": "hello!!"});
});

app.listen(PORT, () => {
  connectDB();
  console.log(`${createCLITimeStamps()} [server] running at ${PORT}`);
});