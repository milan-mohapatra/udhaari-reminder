const { format } = require("date-fns");


function getDayWithSuffix(date) {
  const day = date.getDate();
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

const createCLITimeStamps = () => {
  return format(new Date(), "MM/dd/yyyy HH:mm:ss:SSSS");
};

const createTSForEmail = () => {
  const now = new Date();
  return format(now, `'${getDayWithSuffix(now)}' MMMM yyyy`);
};

module.exports = { createCLITimeStamps, createTSForEmail };
