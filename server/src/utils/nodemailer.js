const nodemailer = require("nodemailer");
const axios = require("axios");
const { generateHTMLTemplet } = require("./templet.utils.js");

const transporter = nodemailer.createTransport({
  service: `${process.env.NODEMAILER_SMTP_SERVICE}`,
  host: `${process.env.NODEMAILER_HOST}`,
  port: process.env.NODEMAILER_PORT,
  secure: JSON.parse(process.env.NODEMAILER_SECURE),
  auth: {
    user: `${process.env.NODEMAILER_USER}`,
    pass: `${process.env.NODEMAILER_PASS}`,
  },
});

const sendReminderEmail = async (
  borrowerName,
  borrowerEmail,
  borrowingAmount,
  yourMessage,
  lender
) => {
  if (!borrowerEmail || !borrowingAmount || !borrowerName || !lender) {
    return { success: false, message: "information insufficient" };
  }

  try {
    if (!yourMessage.length) {
      const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      yourMessage = response.data.joke;
    }

    await transporter.sendMail({
      from: `${process.env.CORPORATE_EMAIl}`,
      to: borrowerEmail,
      subject: `${lender.name} is thinking about you!!`,
      html: generateHTMLTemplet(
        borrowerName,
        borrowingAmount,
        yourMessage,
        lender
      ),
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

module.exports = { sendReminderEmail };
