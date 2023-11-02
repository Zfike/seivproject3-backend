module.exports = (sequelize, Sequelize) => {
    const UserAccommodation = sequelize.define("userAccommodation", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
      permission: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
    return UserAccommodation;
  }
  