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
require("./app/routes/userAccommodationRequest.routes")(app);
require("./app/routes/email.routes")(app);



// Handle SPA client routing, fallback to index.html for any other route
app.use(history());

// Assuming the backend and frontend are siblings in the directory structure
// and the Vite build output goes to "dist" directory in the frontend.
app.use(express.static(path.resolve(__dirname, '..', 'seivproject3-frontend', 'dist')));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


// Set port, listen for requests
const PORT = process.env.PORT || 3021;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;