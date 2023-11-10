module.exports = (sequelize, Sequelize) => {
  const UserAccommodation = sequelize.define("userAccommodation", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    permission: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userAccommodationRequestId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    accommodationCategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
  }, {
    timestamps: false
  });

  return UserAccommodation;
};