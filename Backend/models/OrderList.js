const Sequelize = require("sequelize");

module.exports = global.sequelize.define("OrderList", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Quantity: {
            type: Sequelize.INTEGER(5),
        },
        StablePrice: {
            type: Sequelize.DECIMAL(6,2),
        },

});
 
