module.exports = (sequelize, Sequelize) => {
    const AccommodationCategory = sequelize.define("accommodationCategory", { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'accommodationCategories',
        timestamps: false,
      });
    return AccommodationCategory;
}