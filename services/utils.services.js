const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendMail = async (data) => {
  let testAccount = await nodemailer.createTestAccount();
  console.log("testAccount", testAccount);
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: "<mukeshmajoka1999@gmail.com>",
    to: "rahul1999garh@gmail.com",
    subject: "otp verification",
    text: `your verification otp is ${data.otp}`,
    html: `<b>your verification otp is ${data.otp}</b>`,
  });
  console.log("info", info);
};

const generateToken = (data) => {
  let token = jwt.sign({user: data}, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {generateToken, generateOtp, sendMail};
