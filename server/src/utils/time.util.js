const { format } = require("date-fns");

const createCLITimeStamps = () => {
  return format(new Date(), "MM/dd/yyyy HH:mm:ss:SSSS");
};

module.exports = { createCLITimeStamps };