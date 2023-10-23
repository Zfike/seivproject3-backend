module.exports = (app) => {
    const notifications = require("../controllers/notification.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], notifications.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], notifications.findAll);
  
    // Retrieve all Accommodations for user
    // router.get("/userAccommodation/:userId", [authenticate], notifications.findAllForUser);
  
    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], notifications.findOne);
  
    // Update a Accommodation with id
    router.put("/:id", [authenticate], notifications.update);
  
    // Delete a Accommodation with id
    router.delete("/:id", [authenticate], notifications.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], notifications.deleteAll);
  
    app.use("/accommodation-t1/notifications", router);
  };
  