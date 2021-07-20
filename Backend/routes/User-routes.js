const user_contr = require("../controllers/User-controller");

const express = require('express');
const router = express.Router();

router.delete('/user/:id', user_contr.delete);
router.post('/register', user_contr.create);
router.post('/login', user_contr.validateUser);
router.post('/update', user_contr.update);
router.get('/users', user_contr.findAll)
router.get('/fill_the_database/users', user_contr.fill_the_database_Users);
router.get('/fill_the_database/booking', user_contr.fill_the_database_Booking);
router.get('/fill_the_database/address', user_contr.fill_the_database_Address);
router.get('/fill_the_database/order', user_contr.fill_the_database_Orders);
router.get('/fill_the_database/offerts', user_contr.fill_the_database_Offerts);

module.exports = router;