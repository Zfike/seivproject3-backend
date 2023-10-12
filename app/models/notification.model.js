module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
      notificationId: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Course;
  };
  