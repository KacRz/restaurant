const user_contr = require("../controllers/User-controller");

const express = require('express');
const router = express.Router();

router.get('/user', (req,res) =>{
    user_contr.delete(req,res);

});
router.post('/user', (req,res) =>{
    user_contr.create(req,res);

});
router.get('/fill_the_database/users', user_contr.fill_the_database_Users);
router.get('/fill_the_database/booking', user_contr.fill_the_database_Booking);
router.get('/fill_the_database/address', user_contr.fill_the_database_Address);
router.get('/fill_the_database/order', user_contr.fill_the_database_Orders);
router.get('/fill_the_database/offerts', user_contr.fill_the_database_Offerts);

module.exports = router;