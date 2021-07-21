const Sequelize = require("sequelize");

module.exports = global.sequelize.define("Discount", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Price: {
            type: Sequelize.DECIMAL(6,2),
        },
        DateStart: {
            type: Sequelize.DATEONLY,
        },
        DateEnd: {
            type: Sequelize.DATEONLY,
        },

    });
 
