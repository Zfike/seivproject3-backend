module.exports = (app) => {
    const userAccommodations = require("../controllers/userAccommodation.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new UserAccommodation
    router.post("/", [authenticate], userAccommodations.create);
  
    // Retrieve all UserAccommodations
    router.get("/", [authenticate], userAccommodations.findAll);
  
    // Retrieve all UserAccommodations for user
    router.get("/user/:userId", [authenticate], userAccommodations.findAllForUser);

    // Retrieve a single UserAccommodation with id
    router.get("/:id", [authenticate], userAccommodations.findOne);
  
    // Update a UserAccommodation with id
    router.put("/:id", [authenticate], userAccommodations.update);
  
    // Delete a UserAccommodation with id
    router.delete("/:id", [authenticate], userAccommodations.delete);
  
    // Delete all UserAccommodations
    router.delete("/", [authenticate], userAccommodations.deleteAll);
  
    app.use("/accommodations-t1/userAccommodations", router);
  };
  