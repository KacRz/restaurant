const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { Model } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

const db = {};

module.exports = sequelize;
global.sequelize = sequelize;
db.sequelize = sequelize;



module.exports = db;
require("./ForeignKeyMenager")();