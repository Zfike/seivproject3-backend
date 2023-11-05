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
    accommodationCategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true // or false if you want to make it required
    },
    // Add other fields such as semesterId if necessary
    // semesterId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true, // or false if it is required
    // }
  }, {
    timestamps: false
  });

  return UserAccommodation;
};