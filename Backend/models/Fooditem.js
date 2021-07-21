const Sequelize = require("sequelize");

Fooditem = global.sequelize.define("Fooditem", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Name: {
            type: Sequelize.STRING(30),
        },
        Price: {
            type: Sequelize.DECIMAL(6,2),
        },
        IsDishOfDay: {
            type: Sequelize.TINYINT(1),
        },
        isAvalilable: {
            type: Sequelize.TINYINT(1),
        },
        Number:{
            type: Sequelize.TINYINT(5)
        },  

});

module.exports = Fooditem