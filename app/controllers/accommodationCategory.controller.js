const db = require("../models");
const AccommodationCategory = db.accommodationCategory;
const Op = db.Sequelize.Op;

// Create and Save a new AccommodationCategory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a AccommodationCategory
  const accommodationCategory = {
    id: req.body.id,
    categoryName: req.body.categoryName,
    desc: req.body.desc,
  };
  // Save AccommodationCategory in the database
  AccommodationCategory.create(accommodationCategory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AccommodationCategory.",
      });
    });
};

// Retrieve all AccommodationCategories from the database.
exports.findAll = (req, res) => {
  const categoryName = req.query.categoryName;
  let condition = categoryName ? { categoryName: { [Op.eq]: categoryName } } : null;

  AccommodationCategory.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accommodationCategories.",
      });
    });
};

// Find a single AccommodationCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  AccommodationCategory.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AccommodationCategory with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving AccommodationCategory with id=" + id,
      });
    });
};

// Update a AccommodationCategory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  AccommodationCategory.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AccommodationCategory was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update AccommodationCategory with id=${id}. Maybe AccommodationCategory was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating AccommodationCategory with id=" + id,
      });
    });
};

// Delete a AccommodationCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  AccommodationCategory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AccommodationCategory was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete AccommodationCategory with id=${id}. Maybe AccommodationCategory was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete AccommodationCategory with id=" + id,
      });
    });
};

// Delete all AccommodationCategories from the database.
exports.deleteAll = (req, res) => {
  AccommodationCategory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} AccommodationCategorys were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accommodationCategorys.",
      });
    });
};
