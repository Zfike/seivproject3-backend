module.exports = (sequelize, Sequelize) => {
    const Accommodation = sequelize.define("accommodation", { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        accommodationCategoryId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'accommodations',
        timestamps: false,
      });
    return Accommodation;
}