const user_contr = require("../controllers/User-controller");

const express = require('express');
const router = express.Router();

router.get('/user', (req,res) =>{
    user_contr.delete(req,res);

});
router.post('/user', (req,res) =>{
    user_contr.create(req,res);

});
router.get('/fill_the_database', user_contr.fill_the_database);
module.exports = router;