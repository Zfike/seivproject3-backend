require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path")

const app = express();
const db = require("./app/models");
const nodemailer = require("nodemailer");
const emailSender = require('./emailSender.js');

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

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
    // Access user information from the authentication process
    const user = req.user; // Adjust this to match how you store user information

    if (user && user.email) {
      // Create a notification object
      const notificationData = {
        recipient: user.email, // Use the user's email as the recipient
        content: 'Your email content here', // Customize the email content
      };

      const notification = await db.notification.create(notificationData)
      // Send the email using the notification data
      const result = await emailSender.sendEmail(notification);
      res.status(200).send(result);
    } else {
      res.status(403).send('User not authenticated or missing email.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email.');
  }
});
//For static assets
app.use(express.static(path.join(__dirname, "../seivproject3-frontend")))

//Catch all route for Vue
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "", "../seivproject3-frontend", "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 3021;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
