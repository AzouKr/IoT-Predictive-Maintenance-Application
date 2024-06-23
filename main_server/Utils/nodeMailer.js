// Importing nodemailer module
const nodemailer = require("nodemailer");

// Creating a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail service
  auth: {
    user: "tabernamindustry@gmail.com", // Your email address
    pass: "cfgzstkcpoyyjtys", // Your password
  },
});

// Function to send email
function sendEmail(to, subject, text) {
  let mailOptions = {
    from: "tabernamindustry@gmail.com", // Your email address
    to: to, // Receiver's email address
    subject: subject,
    html: text,
  };

  // Sending email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("Error occurred: ", error);
  //   } else {
  //     console.log("Email sent: ", info.response);
  //   }
  // });
}

module.exports = sendEmail;
