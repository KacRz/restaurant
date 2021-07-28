const OrderList = require("../models/OrderList.js");

exports.create = (req, res) => {
  OrderList.create({Order_fk: req.body.data.order, Fooditem_fk: req.body.data.fooditem,Quantity: req.body.data.quantity, StablePrice: req.body.data.price}).catch(function(err)
  {
    console.log("Error occured: "+err);
    res.send("Error occured");
  })
  res.send("Order list created");
};
// Find a single type with an id
exports.find= (req, res) => {
  res.send(OrderList.findOne({where: {id: req.params.id}}));
};

exports.findbyOrderFk= (req, res) => {
    res.send(OrderList.findAll({where: {Order_fk: req.params.order_id}}));
};
