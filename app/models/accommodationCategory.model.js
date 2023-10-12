module.exports = (sequelize, Sequelize) => {
    const AccommodationCategory = sequelize.define("accommodationCategory", { 
        categoryId: {
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
    })
    return Accommodation
}