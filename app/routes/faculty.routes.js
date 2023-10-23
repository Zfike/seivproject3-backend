module.exports = (app) => {
    const faculty = require("../controllers/faculty.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", [authenticate], faculty.create);
  
    // Retrieve all People
    router.get("/", [authenticate], faculty.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", [authenticate], faculty.findOne);
  
    // Update a User with id
    router.put("/:id", [authenticate], faculty.update);
  
    // Delete a User with id
    router.delete("/:id", [authenticate], faculty.delete);
  
    // Delete all User
    router.delete("/", [authenticate], faculty.deleteAll);
  
    app.use("/accommodations-t1/faculty", router);
  };
  