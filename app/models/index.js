const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
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
db.userAccommodationRequest = require("./userAccommodationRequest.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.section = require("./section.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.studentCourse = require("./studentCourse.model.js")(sequelize, Sequelize);

// Users and Sessions
db.user.hasMany(db.session, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.session.belongsTo(db.user, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Accommodations and User Accommodations
// db.accommodation.hasMany(db.userAccommodation, { foreignKey: 'accommodationId', onDelete: 'CASCADE' });
// db.userAccommodation.belongsTo(db.accommodation, { foreignKey: 'accommodationId', onDelete: 'CASCADE' });

// UserAccommodationRequests and UserAccommodations (One-to-One relationship)
db.userAccommodationRequest.hasMany(db.userAccommodation, { foreignKey: 'userAccommodationRequestId', onDelete: 'CASCADE' });
db.userAccommodation.belongsTo(db.userAccommodationRequest, { foreignKey: 'userAccommodationRequestId', onDelete: 'CASCADE' });

// Users and User Accommodation Requests
db.user.hasMany(db.userAccommodationRequest, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.userAccommodationRequest.belongsTo(db.user, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Users and User Accommodations
db.user.hasMany(db.userAccommodation, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.userAccommodation.belongsTo(db.user, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Accommodation Categories and User Accommodations
db.accommodationCategory.hasMany(db.userAccommodation, { foreignKey: 'accommodationCategoryId', onDelete: 'CASCADE' });
db.userAccommodation.belongsTo(db.accommodationCategory, { foreignKey: 'accommodationCategoryId', onDelete: 'CASCADE' });

// Notifications and User Accommodations
db.userAccommodation.hasMany(db.notification, { foreignKey: 'userAccommodationId', onDelete: 'CASCADE' });
db.notification.belongsTo(db.userAccommodation, { foreignKey: 'userAccommodationId', onDelete: 'CASCADE' });

// Faculties and User Accommodations
db.faculty.belongsTo(db.userAccommodation, { foreignKey: 'facultyId', onDelete: 'CASCADE' });
db.userAccommodation.hasOne(db.faculty, { foreignKey: 'facultyId', onDelete: 'CASCADE' });

// Semesters and User Accommodations
db.semester.hasMany(db.userAccommodation, { foreignKey: 'semesterId', onDelete: 'CASCADE' });
db.userAccommodation.belongsTo(db.semester, { foreignKey: 'semesterId', onDelete: 'CASCADE' });

// Sections and Student Courses
db.section.hasMany(db.studentCourse, { foreignKey: 'sectionId', onDelete: 'CASCADE' });
db.studentCourse.belongsTo(db.section, { foreignKey: 'sectionId', onDelete: 'CASCADE' });

// Faculties and Sections
db.faculty.belongsTo(db.section, { foreignKey: 'facultyId', onDelete: 'CASCADE' });
db.section.hasOne(db.faculty, { foreignKey: 'facultyId', onDelete: 'CASCADE' });

// Students and Student Courses
db.student.belongsTo(db.studentCourse, { foreignKey: 'studentId', onDelete: 'CASCADE' });
db.studentCourse.hasOne(db.student, { foreignKey: 'studentId', onDelete: 'CASCADE' });

module.exports = db;
