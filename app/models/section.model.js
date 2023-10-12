module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
      dept: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      courseNo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hours: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      meetingTime: {
        type: Sequelize.STRING,
      }
    });
    return Course;
  };
  