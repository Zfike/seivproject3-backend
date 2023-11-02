module.exports = (app) => {
    const semesters = require("../controllers/semester.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], semesters.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], semesters.findAll);
  
    // Retrieve all Accommodations for user
    // router.get("/userAccommodation/:userId", [authenticate], semesters.findAllForUser);
  
    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], semesters.findOne);
  
    // Update a Accommodation with id
    router.put("/:id", [authenticate], semesters.update);
  
    // Delete a Accommodation with id
    router.delete("/:id", [authenticate], semesters.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], semesters.deleteAll);
  
    app.use("/accommodations-t1/semesters", router);
  };
  