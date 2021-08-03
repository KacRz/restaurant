require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const mysql2 = require('mysql2');
const vars =  require('./Env.js')
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Database connection

const db = require("./models");

db.sequelize.sync({force: false}).then(() => {
    console.log("Drop and re-sync db.");
    
});

//Simple route
const route = require('./routes/routes');
app.use(route);



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});



