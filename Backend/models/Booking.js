const Sequelize = require("sequelize");

module.exports = global.sequelize.define("Booking", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        ReservationStart: {
            type: Sequelize.DATE,
        },
        ReservationEnd: {
            type: Sequelize.DATE,
        },

    });
 
