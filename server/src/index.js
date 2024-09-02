require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("../config/db.js");
const { createCLITimeStamps } = require("./utils/time.util.js");
const globalErrorHandler = require("./middlewares/global.error.middleware.js")

const app = express();
const PORT = process.env.PORT || 3031;

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", require("./routes/auth.route.js"))
app.use("/api/v1/borrowers", require("./routes/borrower.route.js"))
app.use("/api/v1/admin/users", require("./routes/user.route.js"))

app.all("*", (req, res) => {
  res.status(404).json({message: "invalid route"})
})
app.use(globalErrorHandler)

app.listen(PORT, () => {
  connectDB();
  console.log(`${createCLITimeStamps()} [server] running at ${PORT}`);
});