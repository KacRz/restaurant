const Order = require("../models/Order.js");

exports.create = (req, res) => {
  Order.create({id: req.body.data.id,Address_fk: req.body.data.address_id, Date: Date(req.body.data.date)}).catch((err)=>
  {
      res.status(400).send("Error occured");
  });
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
