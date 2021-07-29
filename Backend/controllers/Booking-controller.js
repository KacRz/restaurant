const Booking = require("../models/Booking.js")
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const moment = require("moment");
exports.create = (req, res) => {
  
};
// Find a single type with an id
exports.findbyDate= (req, res) => {
  Booking.findAll({where: {ReservationStart: req.params.date}}).then(async function(booking){
      res.send(booking);
  })
};
exports.findByID = (req,res) =>
{
  console.log(req.params)
  Booking.findAll({where: { [Op.and]:[{Table_fk: req.params.id},{[Op.gte]:{ReservationEnd: new Date(Date.now()) }}]}}).then(function(book)
  {
    console.log(book);
    res.send(book);
  })
}
// Update a type by the id in the request
exports.update = (req, res) => {
  
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all types from the database.
exports.deleteAll = (req, res) => {
  
};