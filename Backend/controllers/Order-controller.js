const Order = require("../models/Order.js");
const OrderList = require("../models/OrderList.js");
const Address = require("../models/Address.js");
const User = require("../models/User.js")
const { Op } = require("sequelize");

exports.createGuest = async (req, res) => {
  
  await Address.create({
      Country: "Poland",
      City: req.body.data.city,
      Street: req.body.data.street,
      HouseNumber: req.body.data.housenumber,
      PostalCode: req.body.data.postalcode,
    }).then(async function(address) {
      await Order.create({
          Address_fk: address.id,
          OrderDate: Date(req.body.data.date),
          Delivery: req.body.data.delivery,
          Payment: req.body.data.payment,
          Email: req.body.data.email,
          Status: req.body.data.status,
          TotalSum: req.body.data.totalprice
        }).then(async function(order) {

            for (const item in req.body.data.cart) {
              await OrderList.create({
                Fooditem_fk: req.body.data.cart[item].id,
                StablePrice: req.body.data.cart[item].Price,
                Order_fk: order.id,
                Quantity: req.body.data.cart[item].quantity,
              }).catch(function(err) {
                console.log(err);
              })
            }
            res.send("Order for guest created");

        }).catch(function(err) {
          console.log(err);
        })
    }).catch(function(err) {
      console.log(err);
    })
        
  
}

exports.create = (req, res) => {

  Order.create({
    Address_fk: req.body.data.address.id, 
    OrderDate: Date(req.body.data.date),
    Delivery: req.body.data.delivery,
    Email: req.body.data.email,
    Payment: req.body.data.payment,
    Status: req.body.data.status,
    TotalSum: req.body.data.totalprice}).then(async function(order) {

      for (const item in req.body.data.cart) {
        OrderList.create({
          Fooditem_fk: req.body.data.cart[item].id,
          StablePrice: req.body.data.cart[item].Price,
          Order_fk: order.id,
          Quantity: req.body.data.cart[item].quantity,
        })
        .catch(function(err) {
          console.log(err);
        })
      }

    }).catch(function (err) {
      console.log(err);
    })

  res.send("Order created");
  };
  
exports.findByMail = async (req, res) => {
  res.send(await Order.findAll({where: {Email: req.params.email}}));
}

exports.gettodayorders = async (req, res) => {

  const today = new Date().toString();
  const today_night = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()).toString();

  Order.findAll(
    {where: {OrderDate: {[Op.lt]: today, [Op.gt]: today_night}},
    include: [{ model: Address, User }]})
  .then(async function(order){
    res.send(order);
  }).catch(function (err){
    res.send(err);
  })
}

exports.changestatus = async (req, res) => {

  Order.findOne( {where: {id: req.params.id}} ).then(async function(order) {
    if (order.Status == "Złożono zamówienie") {
      order.update({
        Status: "Przyjęto do realizacji"
      })
      res.send({status: "Przyjęto do realizacji"});
    }
    else if (order.Status == "Przyjęto do realizacji") {
      order.update({
        Status: "Gotowe"
      })
      res.send({status: "Gotowe"});
    }
    else if (order.Status == "Gotowe") {
      res.send("Nie zaktualizowano");
    }
  }).catch(function (err) {
    console.log(err);
  })

}

exports.getStatus = async (req, res) => {
  Order.findOne({where: {id: req.params.id}}).then(async function(order) {
    res.send(order.Status);
  })
}

// Find a single type with an id
exports.find= (req, res) => {
  res.send(Order.findOne({where: {id: req.params.id}}));
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
  
};
