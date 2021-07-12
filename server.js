const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const mysql2 = require('mysql2');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Database connection
const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
});

//Simple route
app.get('/', (req, res) => {
    console.log('Server is working');
    res.send("Hello world!");
})



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});



