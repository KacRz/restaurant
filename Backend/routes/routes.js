const cat_routes = require("../controllers/Category-controller");
const disc_routes = require("../controllers/Discount-controller");
const user_contr = require("../controllers/User-controller");
const fooditem_contr = require("../controllers/Fooditem-controller");
const order_contr = require("../controllers/Order-controller");
const orderlist_contr = require("../controllers/OrderList-controller");
const addrress_contr = require("../controllers/Address-controller");
const auth = require("../middleware/auth");

const express = require('express');
const router = express.Router();

router.post('/', (req, res)=> {
    res.send("Bye world!");

})
router.get('/', (req, res)=> {
    res.send("Hello world!");

})
//categories
router.post('/categories/create/', auth,cat_routes.create);
router.get('/categories/', cat_routes.returnAll);
router.post('/categories/update',auth ,cat_routes.update);
router.delete('/categories/del/:id',auth ,cat_routes.delete);
//discounts
router.post('/discounts/create/',auth ,disc_routes.create);
router.get('/discounts/',auth ,disc_routes.returnAll);
router.post('/discounts/update',auth ,disc_routes.update);
router.delete('/discounts/del/:id',auth, disc_routes.delete);
//fooditems
router.post('/fooditem/create/',auth,fooditem_contr.create);
router.get('/fooditem/',fooditem_contr.returnAll);
router.put('/fooditem/:id', fooditem_contr.find);
router.put('/fooditem/aval/:id', auth, fooditem_contr.changeAvalilable);
router.put('/fooditem/dishofday/:id', auth,fooditem_contr.changeDishOfDay);
router.post('/fooditem/update',auth,fooditem_contr.update);
router.delete('/fooditem/del/:id',auth,fooditem_contr.delete);
//orders
router.post('/orders/create/',order_contr.create);
router.put('/orders/:id',auth,order_contr.find);

//orderLists
router.post('/order/create/',orderlist_contr.create);
router.put('/order/one/:id',orderlist_contr.find);
router.put('/order/:order_fk',orderlist_contr.findbyOrderFk);
//users
router.delete('/user/del/:id', auth,user_contr.delete);
router.post('/register', auth,user_contr.create);
router.post('/login', user_contr.validateUser);
router.post('/user/update', auth,user_contr.update);
router.get('/user/all', auth,user_contr.findAll);
router.post('/user/addStaf', auth,user_contr.createStaff);

//addresses
router.get('/address', addrress_contr.findAll);

//testing data
router.get('/fill_the_database/users', user_contr.fill_the_database_Users);
router.get('/fill_the_database/booking', user_contr.fill_the_database_Booking);
router.get('/fill_the_database/address', user_contr.fill_the_database_Address);
router.get('/fill_the_database/order', user_contr.fill_the_database_Orders);
router.get('/fill_the_database/offerts', user_contr.fill_the_database_Offerts);

module.exports = router;
