const nodemailer = require('nodemailer');

function generateRandomNumber() {
  // Generate a random number between 100000 and 999999 (both inclusive)
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

async function sendEmail(to, subject, message) {
  try {
    // Configure the email transport options
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: 'smartattendance@hotmail.com',
        pass: '#3attendancesmart',
      },
    });

    let info = await transporter.sendMail({
      from: 'smartattendance@hotmail.com',
      to: to,
      subject: subject,
      text: message,
      html: "<b>" + message + "</b>",
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  generateRandomNumber,
  sendEmail
};
