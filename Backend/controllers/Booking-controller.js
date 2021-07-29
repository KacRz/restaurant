const Booking = require("../models/Booking.js")

exports.create = (req, res) => {
  
};
// Find a single type with an id
exports.findbyDate= (req, res) => {
  Booking.findAll({where: {ReservationStart: req.params.date}}).then(async function(booking){
      res.send(booking);
  })
};

// Update a type by the id in the request
exports.update = (req, res) => {
  
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all types from the database.
exports.deleteAll = (req, res) => {
  
};