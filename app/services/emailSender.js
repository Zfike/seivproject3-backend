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
async function sendEmail(recipient) {
  try {
    // Configure the email data
    const mailOptions = {
      from: 'z.fike@eagles.oc.edu',
      to: recipient,
      subject: 'No Subject, Test Email',
      text: 'Test' // Include your test content
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

async function confirmationEmail(recipient) {
  console.log('Recipient:', recipient)
  try {
    const mailOptions = {
      from:'z.fike@eagles.oc.edu',
      to: recipient.to,
      subject: 'Accommodation Request Confirmation',
      html: `<b>Initial Accommodations Request Email<br>
              Thank you for submitting your request for accommodations. We require supporting documentation to fulfill<br>
              your request.<br>
              Documentation must be from an appropriate, qualified professional who has seen you within the past 18<br>
              months and must contain the following information:<br>
              1. You are a person with a disability.<br>
              2. The diagnosis (what is the disability?)<br>
              3. Information about the necessary classroom accommodations you will need to<br>
              successfully complete the semester. There must be a nexus between the disability and<br>
              the accommodations requested.<br>
              4. Name and credentials (license #, etc.) of the diagnostic clinician.<br>
              Documentation may be emailed to me, but it must be on official letterhead. If your doctor’s office is<br>
              unwilling to email me (this is the most likely scenario), they may mail the document to you. Then, scan<br>
              and email it to me.<br>
              Once the information is submitted, we will schedule a time to meet to discuss the details (in person or via<br>
              video conference). After our meeting, I will email your professors your specific ADA academic<br>
              accommodations letter. Accommodations MUST BE RENEWED EACH SEMESTER.<br>
              Please let me know if you have any other questions or concerns. I look forward to hearing from you.<br>
              Sincerely,<b>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return 'Email sent successfully.';

  } catch (error) {
    console.error(error);
    throw 'Email could not be sent.';
  };
};

async function approvalEmail(sender, recipient) {
  console.log('Recipient:', recipient)
  try {
    const mailOptions = {
      from: sender.from,
      to: recipient.to,
      subject: 'Accommodation Request Confirmation',
      text: 'Your accommodations have been approved.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return 'Email sent successfully.';

  } catch (error) {
    console.error(error);
    throw 'Email could not be sent.';
  };
};

module.exports = {
  sendEmail,
  confirmationEmail,
  approvalEmail,
};