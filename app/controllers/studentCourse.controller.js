const db = require("../models");
const StudentCourse = db.studentCourse;
const Op = db.Sequelize.Op;
// Create and Save a new StudentCourse
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a StudentCourse
  const studentCourse = {
    id: req.body.id,
  };
  // Save StudentCourse in the database
  StudentCourse.create(studentCourse)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the StudentCourse.",
      });
    });
};
// Retrieve all StudentCourses from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  StudentCourse.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving studentCourses.",
      });
    });
};

// Find a single StudentCourse with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentCourse.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find StudentCourse with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving StudentCourse with id=" + id,
      });
    });
};
// Update a StudentCourse by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentCourse.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentCourse was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update StudentCourse with id=${id}. Maybe StudentCourse was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating StudentCourse with id=" + id,
      });
    });
};
// Delete a StudentCourse with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentCourse.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentCourse was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete StudentCourse with id=${id}. Maybe StudentCourse was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete StudentCourse with id=" + id,
      });
    });
};
// Delete all StudentCourses from the database.
exports.deleteAll = (req, res) => {
  StudentCourse.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} StudentCourses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all studentCourses.",
      });
    });
};
