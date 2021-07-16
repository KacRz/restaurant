const Sequelize = require("sequelize");
module.exports = global.sequelize.define("Table", {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    ReservationStart: {
        type: Sequelize.INTEGER(2),
    },

});

