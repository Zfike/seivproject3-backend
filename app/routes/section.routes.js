module.exports = (app) => {
    const sections = require("../controllers/section.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], sections.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], sections.findAll);
  
    // Retrieve all Accommodations for user
    // router.get("/userAccommodation/:userId", [authenticate], sections.findAllForUser);
  
    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], sections.findOne);
  
    // Update a Accommodation with id
    router.put("/:id", [authenticate], sections.update);
  
    // Delete a Accommodation with id
    router.delete("/:id", [authenticate], sections.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], sections.deleteAll);
  
    app.use("/accommodation-t1/sections", router);
  };
  