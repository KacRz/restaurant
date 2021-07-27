const Discount = require("../models/Discount.js");

exports.create = (req, res) => {
 Discount.findOne({where: {Name: req.body.name} }).then(function(disc)
  {
    if(!disc)
    {
        Discount.create({Name: req.body.name});
    }
    else
    {
        res.send("Category Exists");
    }
  }).catch((err)=>
  {
      res.status(400).send("Error occured");
  });
};

exports.returnAll = (req,res)=>{
    res.send(Discount.findAll()).catch((err)=>
    {
        res.status(400).send("Error occured");
    });

}
// Update a type by the id in the request
exports.update = (req, res) => {
    Discount.findOne({where: {id: req.body.id} }).then(function(disc)
  {
    if(!disc)
    {
        res.send("Category doesn't exists")
    }
    else
    {
        if(typeof req.body.Start != 'undefinded' )
        {
            disc.DateStart = new Date(req.body.Start);
        }
        if(typeof req.body.End != 'undefinded' )
        {
            disc.DateEnd = new Date(req.body.End);
        }        
        disc.Prcie = req.body.price;
        disc.save();
        res.send("Updated");
    }
  }).catch((err)=>
  {
      res.status(400).send("Error occured");
  });
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
  Discount.findOne({where: {id: req.params.id} }).then(function(disc)
  {
  if(!disc)
    {
        res.send("Category doesn't exists");
    }
    else
    {
        disc.dalete();
        res.send("Deleted");
    }
}).catch((err)=>
{
    res.status(400).send("Error occured");
});
};
