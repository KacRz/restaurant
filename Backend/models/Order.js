const Sequelize = require("sequelize");

module.exports = global.sequelize.define("Order", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Date: {
            type: Sequelize.DATE,
        },
        
});
 
