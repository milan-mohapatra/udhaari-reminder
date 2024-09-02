const { createTSForEmail } = require("./time.util.js");

const generateHTMLTemplet = (
  borrowerName,
  borrowingAmount,
  yourMessage,
  lender
) => {
  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Udhaari Reminder</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    "
  >
    <!-- Wrapper Table -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color: #f4f4f4; padding: 20px 0"
    >
      <tr>
        <td align="center">
          <!-- Main Table -->
          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="background-color: #4caf50; color: white; padding: 20px"
              >
                <h1 style="margin: 0; font-size: 28px; font-weight: 600">
                  Udhaari Reminder
                </h1>
              </td>
            </tr>

            <!-- Greeting Section -->
            <tr>
              <td style="padding: 20px; color: #333333; text-align: center">
                <p style="font-size: 18px; margin: 0 0 10px">
                  Hello! <strong>${capitalizeName(borrowerName)}</strong>, ${capitalizeName(lender.name)} wrote something for you.
                </p>
              </td>
            </tr>

            <!-- Joke Section -->
            <tr>
              <td
                style="
                  padding: 20px;
                  color: #333333;
                  text-align: center;
                  background-color: #f9f9f9;
                  border-radius: 4px;
                  margin-bottom: 20px;
                "
              >
                <p style="font-size: 16px; line-height: 1.6; margin: 0">
                  <strong>${yourMessage}</strong>
                </p>
              </td>
            </tr>

            <!-- Content Section -->
            <tr>
              <td style="padding: 20px; color: #333333">
                <p style="font-size: 18px; margin: 0 0 10px">Dear ${capitalizeName(borrowerName)},</p>
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px">
                  This is a reminder that your Udhaari payment is due. Please
                  make sure to settle your balance as soon as possible.
                </p>
                <div
                  style="
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 4px;
                    margin-bottom: 20px;
                  "
                >
                  <p style="margin: 0; font-size: 16px">
                    <strong>Amount Due:</strong> ${borrowingAmount} INR <br />
                    <strong>Due Date:</strong> ${createTSForEmail()}
                  </p>
                </div>
                <p style="font-size: 16px; line-height: 1.6">
                  Thank you for your prompt attention to this matter.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="background-color: #333333; color: white; padding: 15px"
              >
                <p style="margin: 0; font-size: 14px">
                  © 2024 Udhaari Reminder. All rights reserved.
                </p>
                <p style="margin: 5px 0 0">
                  <a href="#" style="color: #4caf50; text-decoration: none"
                    >Unsubscribe</a
                  >
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

module.exports = {generateHTMLTemplet}