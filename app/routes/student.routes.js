module.exports = (app) => {
    const student = require("../controllers/student.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", [authenticate], student.create);
  
    // Retrieve all People
    router.get("/", [authenticate], student.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", [authenticate], student.findOne);
  
    // Update a User with id
    router.put("/:id", [authenticate], student.update);
  
    // Delete a User with id
    router.delete("/:id", [authenticate], student.delete);
  
    // Delete all User
    router.delete("/", [authenticate], student.deleteAll);
  
    app.use("/accommodations-t1/student", router);
  };
  