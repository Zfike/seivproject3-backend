module.exports = (app) => {
    const accommodationCategories = require("../controllers/accommodationCategory.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], accommodationCategories.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], accommodationCategories.findAll);
  
    // Retrieve all Accommodations for user
    // router.get("/userAccommodation/:userId", [authenticate], accommodationCategories.findAllForUser);
  
    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], accommodationCategories.findOne);
  
    // Update a Accommodation with id
    router.put("/:id", [authenticate], accommodationCategories.update);
  
    // Delete a Accommodation with id
    router.delete("/:id", [authenticate], accommodationCategories.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], accommodationCategories.deleteAll);
  
    app.use("/accommodations-t1/accommodationCategories", router);
  };
  