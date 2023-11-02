require("dotenv").config();
const express = require("express");
const cors = require("cors");
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
    const result = await emailSender.sendTestEmail();
    res.status(200).send(result);
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).send('Error sending test email.');
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 3021;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
