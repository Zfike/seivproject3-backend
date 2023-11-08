const db = require("../models");
const UserAccommodation = db.userAccommodation;
const Op = db.Sequelize.Op;

// Create and Save a new UserAccommodation
exports.create = (req, res) => {
  // Assuming req.body has userId, permission, accommodationCategoryId, and description
  UserAccommodation.create({
    userId: req.body.userId,
    userAccommodationRequestId: req.body.userAccommodationRequestId,
    permission: req.body.permission,
    accommodationCategoryId: req.body.accommodationCategoryId,
    description: req.body.description, // Include the description from the request body
    status: req.body.status || 'Pending'  // Set status to 'pending' by default if not provided
  })
  .then((userAccommodation) => {
    res.send(userAccommodation);
  })
  .catch((err) => {
    res.status(500).send({
      message: "Error creating UserAccommodation",
      error: err.message
    });
  });
};

// Retrieve all UserAccommodations from the database.
exports.findAll = (req, res) => {
  UserAccommodation.findAll({
    include: [
      {
        model: db.user,
        as: 'user',
        attributes: ['fName', 'lName'],
      },
      {
        model: db.accommodationCategory,
        as: 'accommodationCategory',
        attributes: ['categoryName'],
      }
    ]
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving userAccommodations.",
    });
  });
};


// Find all UserAccommodations for a user with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  console.log("Looking for UserAccommodations with userId:", userId); // Log the userId
  UserAccommodation.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.user,
        as: 'user',
        attributes: ['fName', 'lName'],
      },
      {
        model: db.accommodationCategory,
        as: 'accommodationCategory',
        attributes: ['categoryName'],
      }
    ]
  })
  .then((data) => {
    if (data.length) { // Check if the data array is not empty
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find UserAccommodations for user with id=${userId}.`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message ||
        "Error retrieving UserAccommodations for user with id=" + userId,
    });
  });
};

// Find a single UserAccommodation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  UserAccommodation.findByPk(id, {
    include: [
      {
        model: db.user,
        as: 'user',
        attributes: ['fName', 'lName'],
      },
      {
        model: db.accommodationCategory,
        as: 'accommodationCategory',
        attributes: ['categoryName'],
      }
    ]
  })
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
