const OrderList = require("../models/OrderList.js");
const Fooditem = require("../models/Fooditem.js");

exports.create = (req, res) => {
  OrderList.create({Order_fk: req.body.data.order, Fooditem_fk: req.body.data.fooditem,Quantity: req.body.data.quantity, StablePrice: req.body.data.price}).catch(function(err)
  {
    console.log("Error occured: "+err);
    res.status(400).send("Error occured");
  })
  res.status(200).send("Order list created");
};
// Find a single type with an id
exports.find= (req, res) => {
  res.status(200).send(OrderList.findOne({where: {id: req.params.id}}));
};

exports.findbyOrderFk= (req, res) => {
    res.status(200).send(OrderList.findAll({where: {Order_fk: req.params.order_id}}));
};

exports.findByOrderFK = (req, res) => {
  OrderList.findAll({
    where: {Order_fk: req.params.orderid},
    include: [{ model: Fooditem,
                attributes: ['Title'] }]
  })
    .then(async function(order) {

        res.status(200).send(order);

  }).catch(function(err) {
    res.status(400).send("Error" + err);
  })
}

