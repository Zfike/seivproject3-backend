module.exports = (sequelize, Sequelize) => {
    const StudentCourse = sequelize.define("studentCourse", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {
        timestamps: false,
      });
    return StudentCourse;
  }
  