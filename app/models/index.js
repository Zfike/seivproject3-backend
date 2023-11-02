const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.accommodation = require("./accommodation.model.js")(sequelize, Sequelize);
db.accommodationCategory = require("./accommodationCategory.model.js")(sequelize, Sequelize);
db.userAccommodation = require("./userAccommodation.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.section = require("./section.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.studentCourse = require("./studentCourse.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for accommodations
db.accommodation.hasMany(
  db.userAccommodation,
  { as: "userAccommodation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.userAccommodation.belongsTo(
  db.accommodation,
  { as: "accommodation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.userAccommodation,
  { as: "userAccommodation1" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.userAccommodation.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for accommodationCategory
db.accommodationCategory.hasMany(
  db.userAccommodation,
  { as: "userAccommodation2" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.userAccommodation.belongsTo(
  db.accommodation,
  { as: "accommodation1" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for userAccommodations
db.userAccommodation.hasMany(
  db.notification,
  { as: "notification" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.faculty.belongsTo(
  db.userAccommodation,
  { as: "userAccommodation3" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for semester
db.semester.hasMany(
  db.userAccommodation,
  { as: "userAccommodation4" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.section.belongsTo(
  db.semester,
  { as: "semester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.userAccommodation.belongsTo(
  db.semester,
  { as: "semester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for section
db.section.hasMany(
  db.studentCourse,
  { as: "userAccommodation5" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.studentCourse.belongsTo(
  db.section,
  { as: "section" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.faculty.belongsTo(
  db.section,
  { as: "section" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for studentCourse
db.student.belongsTo(
  db.studentCourse,
  { as: "studentCourse" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// // foreign key for lessons
// db.tutorial.hasMany(
//   db.lesson,
//   { as: "lesson" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.lesson.belongsTo(
//   db.tutorial,
//   { as: "tutorial" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

module.exports = db;
