module.exports = (sequelize, Sequelize) => {
  const userAccommodationRequest = sequelize.define("userAccommodationRequest", {
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
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'approved', 'declined'],
      defaultValue: 'pending',
      allowNull: false
    },
  }, {
    timestamps: false
  });

  return userAccommodationRequest;
};