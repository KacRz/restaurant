const Address = require("../models/Address.js")
const User = require("../models/User.js")

exports.create = (req, res) => {
User.findOne({where: {email: req.body.email}}).then(async function(user) {
    Address.create({
      Country: "Poland",
      City: req.body.data.newCity,
      Street: req.body.data.newStreet,
      HouseNumber: req.body.data.newHouseNumber,
      PostalCode: req.body.data.newPostalCode,
      User_fk: user.id
    })
    res.send("Dodano adres");
}).catch((err)=>
{
    res.status(400).send("Error occured");
});

};

// Find a single type with an id
exports.findbyId= (req, res) => {
  res.send(Address.findOne({where: {id: req.params.id}})).catch((err)=>
  {
      res.status(400).send("Error occured");
  });;
};

// Find all addresses with user id
exports.findbyMail= async (req, res) => {
    User.findOne({where: {email: req.params.email}}).then(async function(user) {

        Address.findAll({where: {User_fk: user.id}})
        .then(function(add) {
          res.send(add)
        })

    })
    .catch((err)=>
  {
      res.status(400).send("Error occured");
  });

  };

exports.findAll = async(req, res) => {
    res.send(await Address.findAll()).catch((err)=>
    {
        res.status(400).send("Error occured");
    });;
}

// Update a type by the id in the request
exports.update = (req, res) => {
  
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
  Address.findOne({where: {id: req.params.id}}).then(async function (adres) {
    adres.destroy();
    res.send("Address deleted");
  }).catch((err)=>
  {
      res.status(400).send("Error occured");
  });
};

// Delete all types from the database.
exports.deleteAll = (req, res) => {
  
};