const Booking = require("../models/Booking.js")
const User = require("../models/User.js")
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const moment = require("moment");
exports.create = (req, res) => {
  //ReservationStart: '2021-08-09T17:00:00.000Z',
  //ReservationEnd: '2021-08-09T18:00:00.000Z',
  //TableID: 0,
  //email: 'KowalJan@gmail.com'
  try{
    User.findOne({where: {email: req.body.data.email}}).then(async function(user)
    {
      if(!user)
      {
        res.status(205).send("Login error")
      }
      else{
        Booking.create({ReservationStart: req.body.data.ReservationStart, ReservationEnd: req.body.data.ReservationEnd, Table_fk: req.body.data.TableID, User_fk: user.id});
        res.status(200).send("Booking created")
      }
    });

  }
  catch(err){
    res.status(400).send("Error occured")
  }

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
    res.status(399).send('error occured')
  }
}
exports.getAll = (req,res) =>
{
  console.log('aaaa')
  try{
    Booking.findAll({order: [['ReservationStart', 'asc']],raw: true,attributes: ['Table_fk','ReservationEnd', 'ReservationStart'],where: { [Op.and]:[{ReservationStart:{[Op.gte]: new Date().toUTCString()}},{ReservationEnd:{[Op.gte]: new Date().toUTCString()}}]}})
    .then(function(book)
    {

      res.status(200).send(book);
    })
    }
    catch(err)
    {
      console.log(err);
      res.status(399).send('error occured')
    }

}
exports.update = (req, res) => {
  
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