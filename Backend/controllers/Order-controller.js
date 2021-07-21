const Order = require("../models/Order.js");

exports.create = (req, res) => {
  Order.create({id: req.body.data.id,Address_fk: req.body.data.address_id, Date: Date(req.body.data.date)}).catch(function(err)
  {
      consoler.log("Error occured: "+err)
      res.send("Order not created");
  });
    res.send("Order created");
};
// Find a single type with an id
exports.find= (req, res) => {
  res.send(Order.findOne({where: {id: req.params.id}}));
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
  
};
