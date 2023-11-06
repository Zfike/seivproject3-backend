module.exports = (app) => {
    const userAccommodations = require("../controllers/userAccommodation.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], userAccommodations.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], userAccommodations.findAll);
  
    // Retrieve all Accommodations for user
    router.get("/user/:userId", [authenticate], userAccommodations.findAllForUser);

    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], userAccommodations.findOne);
  
    // Update a Accommodation with id
    router.put("/:id", [authenticate], userAccommodations.update);
  
    // Delete a Accommodation with id
    router.delete("/:id", [authenticate], userAccommodations.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], userAccommodations.deleteAll);
  
    app.use("/accommodations-t1/userAccommodations", router);
  };
  