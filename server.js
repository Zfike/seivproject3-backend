require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const history = require('connect-history-api-fallback');

const app = express();
const db = require("./app/models");
const nodemailer = require("nodemailer");
const emailSender = require('./app/services/emailSender.js');

db.sequelize.sync();

var corsOptions = {
  origin: ["http://localhost:8081", "https://project3.eaglesoftwareteam.com"],
  // credentials: true, // You might need this if your front-end uses credentials like cookies or auth headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable pre-flight for all routes

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// API routes
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/accommodation.routes")(app);
require("./app/routes/accommodationCategory.routes")(app);
require("./app/routes/faculty.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/section.routes")(app);
require("./app/routes/semester.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/studentCourse.routes")(app);
require("./app/routes/userAccommodation.routes")(app);

app.post('/send-email', async (req, res) => {
  try {
    // Get the email details from the request body
    const emailDetails = req.body;

    // You may need to verify and construct the email details as needed
    const notificationData = {
      recipient: 'jaxen.mcray@eagles.oc.edu', // Replace with actual recipient email
      subject: emailDetails.subject,
      content: emailDetails.content,
    };

    // Send the email using the email sender module
    const result = await emailSender.sendEmail(notificationData);
    res.status(200).send(result);

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email.');
  }
});

// Handle SPA client routing, fallback to index.html for any other route
app.use(history());

// Assuming the backend and frontend are siblings in the directory structure
// and the Vite build output goes to "dist" directory in the frontend.
app.use(express.static(path.resolve(__dirname, '..', 'seivproject3-frontend', 'dist')));


// Set port, listen for requests
const PORT = process.env.PORT || 3021;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;