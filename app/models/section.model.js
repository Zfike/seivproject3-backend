module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
      desc: {
        type: Sequelize.STRING,
      },
      meetingTime: {
        type: Sequelize.STRING,
      }
    }, {
      timestamps: false,
    });
    return Section;
  }
  