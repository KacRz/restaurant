const Sequelize = require("sequelize");
module.exports = global.sequelize.define("Rating", {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    Rating: {
        type: Sequelize.INTEGER(5),
    },
    Comment: {
        type: Sequelize.STRING(200)
    }
    
});

