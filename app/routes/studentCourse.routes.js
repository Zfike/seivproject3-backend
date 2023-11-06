module.exports = (app) => {
    const studentCourses = require("../controllers/studentCourse.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], studentCourses.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], studentCourses.findAll);
  
    // Retrieve all Accommodations for user
    // router.get("/studentCourse/:userId", [authenticate], useraccommodations.findAllForUser);
  
    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], studentCourses.findOne);
  
    // Update a Accommodation with id
    router.put("/:id", [authenticate], studentCourses.update);
  
    // Delete a Accommodation with id
    router.delete("/:id", [authenticate], studentCourses.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], studentCourses.deleteAll);
  
    app.use("/accommodations-t1/studentCourses", router);
  };
  