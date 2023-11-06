const nodemailer = require("nodemailer");
// Create a nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: 'z.fike@eagles.oc.edu', // Your email address
    pass: 'mwln pwie ucrj aofi' // Your email password
  }
});
// Function to send a test email
async function sendEmail(notification) {
  try {
    // Configure the email data
    const mailOptions = {
      from: 'z.fike@eagles.oc.edu',
      to: notification.recipient,
      subject: notification.subject,
      text: notification.content // Include your test content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return 'Email sent successfully.';
  } catch (error) {
    console.error(error);
    throw 'Email could not be sent.';
  }
}
module.exports = {
  sendEmail,
};