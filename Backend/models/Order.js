const Sequelize = require("sequelize");

module.exports = global.sequelize.define("Order", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        OrderDate: {
            type: Sequelize.DATE,
        },
        Delivery: {
            type: Sequelize.STRING(15),
        },
        Payment: {
            type: Sequelize.STRING(15),
        },
        Email: {
            type: Sequelize.STRING(50),
        },
        TotalSum: {
            type: Sequelize.DECIMAL(6,2),
        },
        Status: {
            type: Sequelize.STRING(30),
        }
        
});
 
