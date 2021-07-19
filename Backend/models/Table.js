const Sequelize = require("sequelize");
module.exports = global.sequelize.define("Table", {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    Size: {
        type: Sequelize.INTEGER(3),
    },

});

