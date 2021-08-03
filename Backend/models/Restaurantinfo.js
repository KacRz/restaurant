const Sequelize = require("sequelize");
module.exports = global.sequelize.define("Restaurantinfo", {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: Sequelize.STRING(20),
    },
    value: {
        type: Sequelize.STRING(50)
    }
    
});

