const db = require("../models");
const UserAccommodation = db.userAccommodation;
const Op = db.Sequelize.Op;
// Create and Save a new UserAccommodation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a UserAccommodation
  const userAccommodation = {
    id: req.body.id,
    permission: req.body.permission,
  };
  // Save UserAccommodation in the database
  UserAccommodation.create(userAccommodation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserAccommodation.",
      });
    });
};
// Retrieve all UserAccommodations from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  UserAccommodation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userAccommodations.",
      });
    });
};

// Find a single UserAccommodation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  UserAccommodation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find UserAccommodation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving UserAccommodation with id=" + id,
      });
    });
};
// Update a UserAccommodation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  UserAccommodation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserAccommodation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update UserAccommodation with id=${id}. Maybe UserAccommodation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating UserAccommodation with id=" + id,
      });
    });
};
// Delete a UserAccommodation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  UserAccommodation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserAccommodation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete UserAccommodation with id=${id}. Maybe UserAccommodation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete UserAccommodation with id=" + id,
      });
    });
};
// Delete all UserAccommodations from the database.
exports.deleteAll = (req, res) => {
  UserAccommodation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} UserAccommodations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userAccommodations.",
      });
    });
};