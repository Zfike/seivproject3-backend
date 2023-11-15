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
    semesterId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Pending', 'Approved', 'Declined'],
      defaultValue: 'Pending',
      allowNull: false
    },
  }, {
    timestamps: false
  });

  return userAccommodationRequest;
};