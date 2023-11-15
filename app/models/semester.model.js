module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semester", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
    return Semester;
  }
  