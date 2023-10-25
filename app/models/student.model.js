module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      classification: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Student;
  };
  