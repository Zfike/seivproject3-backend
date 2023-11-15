module.exports = (app) => {
    const accommodationCategories = require("../controllers/accommodationCategory.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation Category
    router.post("/", [authenticate], accommodationCategories.create);
  
    // Retrieve all Accommodations Categories
    router.get("/", [authenticate], accommodationCategories.findAll);
  
    // Retrieve a single Accommodation Category with id
    router.get("/:id", [authenticate], accommodationCategories.findOne);
  
    // Update a Accommodation Category with id
    router.put("/:id", [authenticate], accommodationCategories.update);
  
    // Delete a Accommodation Category with id
    router.delete("/:id", [authenticate], accommodationCategories.delete);
  
    // Delete all Accommodation Categories
    router.delete("/", [authenticate], accommodationCategories.deleteAll);
  
    app.use("/accommodations-t1/accommodationCategories", router);
  };
  