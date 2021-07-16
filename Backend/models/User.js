const Sequelize = require("sequelize");

module.exports = global.sequelize.define("User", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING(50)
        },
        firstname: {
            type: Sequelize.STRING(50)
        },
        lastname: {
            type: Sequelize.STRING(50)
        },


    });
 
