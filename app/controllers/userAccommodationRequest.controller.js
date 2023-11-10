const db = require("../models");
const userAccommodationRequest = db.userAccommodationRequest;
const Op = db.Sequelize.Op;

// Create and Save a new userAccommodationRequest
exports.create = (req, res) => {
  // Assuming req.body has userId, permission, and description
  userAccommodationRequest.create({
    userId: req.body.userId,
    permission: req.body.permission,
    description: req.body.description, // Include the description from the request body
    status: req.body.status || 'Pending'  // Set status to 'Pending' by default if not provided
  })
  .then((userAccommodationRequest) => {
    res.send(userAccommodationRequest);
  })
  .catch((err) => {
    res.status(500).send({
      message: "Error creating userAccommodationRequest",
      error: err.message
    });
  });
};

// Retrieve all userAccommodationRequests from the database.
exports.findAll = (req, res) => {
  userAccommodationRequest.findAll({
    include: [
      {
        model: db.user,
        as: 'user',
        attributes: ['fName', 'lName'],
      }
    ]
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving userAccommodationRequests.",
    });
  });
};


// Find all userAccommodationRequests for a user with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  console.log("Looking for userAccommodationRequests with userId:", userId); // Log the userId
  userAccommodationRequest.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.user,
        as: 'user',
        attributes: ['fName', 'lName'],
      }
    ]
  })
  .then((data) => {
    if (data.length) { // Check if the data array is not empty
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find userAccommodationRequests for user with id=${userId}.`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message ||
        "Error retrieving userAccommodationRequests for user with id=" + userId,
    });
  });
};

// Find a single userAccommodationRequest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  userAccommodationRequest.findByPk(id, {
    include: [
      {
        model: db.user,
        as: 'user',
        attributes: ['fName', 'lName'],
      }
    ]
  })
  .then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find userAccommodationRequest with id=${id}.`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error retrieving userAccommodationRequest with id=" + id,
    });
  });
};

// Update a userAccommodationRequest by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  userAccommodationRequest.update(req.body, {
    where: { id: id },
  })
  .then((num) => {
    if (num == 1) {
      res.send({
        message: "userAccommodationRequest was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update userAccommodationRequest with id=${id}. Maybe userAccommodationRequest was not found or req.body is empty!`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error updating userAccommodationRequest with id=" + id,
    });
  });
};

// Delete a userAccommodationRequest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  userAccommodationRequest.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "userAccommodationRequest was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete userAccommodationRequest with id=${id}. Maybe userAccommodationRequest was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete userAccommodationRequest with id=" + id,
      });
    });
};
// Delete all userAccommodationRequests from the database.
exports.deleteAll = (req, res) => {
  userAccommodationRequest.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} userAccommodationRequests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userAccommodationRequests.",
      });
    });
};
