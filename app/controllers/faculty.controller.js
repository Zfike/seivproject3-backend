const db = require("../models");
const Faculty = db.faculty;
const Op = db.Sequelize.Op;

// Create and Save a new Faculty
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Faculty
  const faculty = {
    id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    department: req.body.department
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save Faculty in the database
  Faculty.create(faculty)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Faculty.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Faculty.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Faculty with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Faculty.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Faculty with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Faculty with id=" + id,
      });
    });
};

// Find a single Faculty with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  Faculty.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Faculty with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Faculty with email=" + email,
      });
    });
};

// Update a Faculty by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Faculty.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faculty was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Faculty with id=${id}. Maybe Faculty was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Faculty with id=" + id,
      });
    });
};

// Delete a Faculty with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Faculty.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faculty was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Faculty with id=${id}. Maybe Faculty was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Faculty with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Faculty.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
