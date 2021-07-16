const Sequelize = require("sequelize");

module.exports =  sequelize.define("UserType", {
        id:{

            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        NameType:
        {
            type: Sequelize.STRING(50)
        }
    });
    
