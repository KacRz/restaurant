const user_routes = require('./User-routes');

const express = require('express');
const router = express.Router();

router.post('', (req, res)=> {
    res.send("Bye world!");

})
router.get('', (req, res)=> {
    res.send("Hello world!");

})

module.exports = router;
module.exports = user_routes;