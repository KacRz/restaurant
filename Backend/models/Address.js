const Sequelize = require("sequelize");

module.exports = global.sequelize.define("Address", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Country: {
            type: Sequelize.STRING(50),
        },
        City: {
            type: Sequelize.STRING(50),
        },
        Street: {
            type: Sequelize.STRING(50),
        },
        HouseNumber: {
            type: Sequelize.STRING(10),
        },
        PostalCode: {
            type: Sequelize.STRING(7),
        },  
        

});
 
