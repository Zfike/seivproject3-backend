module.exports = (sequelize, Sequelize) => {
    const StudentCourse = sequelize.define("notification", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    });
    return StudentCourse;
  };
  