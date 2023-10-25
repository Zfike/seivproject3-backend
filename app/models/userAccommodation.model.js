module.exports = (sequelize, Sequelize) => {
    const UserAccommodation = sequelize.define("notification", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
      permission: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
    return UserAccommodation;
  };
  