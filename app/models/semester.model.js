module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semester", {
      semesterId: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    return Course;
  };
  