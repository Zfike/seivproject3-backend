module.exports = (app) => {
  const accommodations = require("../controllers/accommodation.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Accommodation
  router.post("/", [authenticate], accommodations.create);

  // Retrieve all Accommodations
  router.get("/", [authenticate], accommodations.findAll);

  // Retrieve all Accommodations for user
  router.get("/user/:userId", [authenticate], accommodations.findAllForUser);

  // Retrieve a single Accommodation with id
  router.get("/:id", [authenticate], accommodations.findOne);

  // Update a Accommodation with id
  router.put("/:id", [authenticate], accommodations.update);

  // Delete a Accommodation with id
  router.delete("/:id", [authenticate], accommodations.delete);

  // Delete all Accommodations
  router.delete("/", [authenticate], accommodations.deleteAll);

  // Retrieve all Accommodations by accommodationCategoryId
  router.get("/category/:accommodationCategoryId", [authenticate], accommodations.findAllByCategoryId);

  app.use("/accommodations-t1/accommodations", router);
};
