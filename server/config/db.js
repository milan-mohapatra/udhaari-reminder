const mongoose = require("mongoose");
const { createCLITimeStamps } = require("../src/utils/time.util.js");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log(`${createCLITimeStamps()} [mongodb] db is connected`);
  } catch (err) {
    let connectionCount = 2;

    const reConnect = async () => {
      try {
        await mongoose.connect(`${process.env.DB_URI}`);
        console.log(`${createCLITimeStamps()} [mongodb] db is connected`);

        clearInterval(reConnectId);
      } catch (err) {
        if (connectionCount > 0) {
          console.log(
            `${createCLITimeStamps()} [mongodb] reconnecting... (${connectionCount})`
          );
          connectionCount--;
        } else {
          console.error("Error", err);
          clearInterval(reConnectId);
        }
      }
    };

    const reConnectId = setInterval(reConnect, 2000);
  }
};

module.exports = { connectDB };
