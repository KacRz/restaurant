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
  
  // {[Op.gte]:{ReservationEnd: Date }}
  try{
  Booking.findAll({raw: true,attributes: ['ReservationEnd', 'ReservationStart'],where: { [Op.and]:[{Table_fk: req.params.id},{ReservationEnd:{[Op.gte]: new Date().toUTCString()}}]}}).then(function(book)
  {
    
    
    if(book)
    {
      res.status(200).send(book)
    }
    else
      res.status(200).send(book);
  })
  }
  catch(err)
  {
    console.log(err);
    res.status(400).send('error occured')
  }
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