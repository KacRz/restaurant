const Order = require("../models/Order.js");
const OrderList = require("../models/OrderList.js");
const Address = require("../models/Address.js");

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
          Date: Date(req.body.data.date),
          Delivery: req.body.data.delivery,
          Payment: req.body.data.payment,
          Email: req.body.data.email
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
    Date: Date(req.body.data.date),
    Delivery: req.body.data.delivery,
    Email: req.body.data.email,
    Payment: req.body.data.payment}).then(async function(order) {

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
  
// Find a single type with an id
exports.find= (req, res) => {
  res.send(Order.findOne({where: {id: req.params.id}})).catch((err)=>
  {
      res.status(400).send("Error occured");
  });;
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
  
};
