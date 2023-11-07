module.exports = (app) => {
    const userAccommodationRequests = require("../controllers/userAccommodationRequest.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation Request
    router.post("/", [authenticate], userAccommodationRequests.create);
  
    // Retrieve all Accommodation Request
    router.get("/", [authenticate], userAccommodationRequests.findAll);
  
    // Retrieve all Accommodation Request for user
    router.get("/user/:userId", [authenticate], userAccommodationRequests.findAllForUser);

    // Retrieve a single Accommodation Request with id
    router.get("/:id", [authenticate], userAccommodationRequests.findOne);
  
    // Update an Accommodation Request with id
    router.put("/:id", [authenticate], userAccommodationRequests.update);
  
    // Delete an Accommodation Request with id
    router.delete("/:id", [authenticate], userAccommodationRequests.delete);
  
    // Delete all Accommodation Requests
    router.delete("/", [authenticate], userAccommodationRequests.deleteAll);
  
    app.use("/accommodations-t1/userAccommodationRequests", router);
  };
  