const Sequelize = require("sequelize");

module.exports = global.sequelize.define("Category", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Name: {
            type: Sequelize.STRING(20),
        },

    });
 
