const Sequelize = require("sequelize");

Fooditem = global.sequelize.define("Fooditem", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Title: {
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
        Foodnumber:{
            type: Sequelize.TINYINT(5)
        },
        Description: {
            type: Sequelize.STRING(60),
        },
        imgsource: {
            type: Sequelize. STRING(200),
        }

});

module.exports = Fooditem