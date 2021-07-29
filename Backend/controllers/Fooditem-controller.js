const Fooditem = require("../models/Fooditem.js");


exports.create = (req, res) => {
    Fooditem.findOne({ where: {Name: req.body.name } }).then(async function (food) {

        if (!food) {
            Fooditem.create({Name: req.body.data.name, Price: req.body.data.price, isAvalilable: req.body.data.available, isDishOfDay: req.body.data.dishofday})
            res.send("Not found");
        }
        else {
            res.send("Logged in");
        }
 
    })
};
// Find a single type with an id
exports.find= async (req, res) => {
  res.send(await Fooditem.findOne({where: {id: req.params.id}}));
};
exports.returnAll= async(req, res) => {
    res.send(await Fooditem.findAll());
};

// Update a type by the id in the request
exports.update = (req, res) => {
  Fooditem.findOne({where: {id: req.body.data.id}}).then(function (food)
  {
    if(!food)
    {   
        res.send("Dish not found");
    }
    else{
        food.Name = req.body.data.name;
        food.Price = req.body.data.Price;
        food.isAvalilable= req.body.data.available;
        if(req.body.data.isDishOfDay)
        {
            Fooditem.update({values:{ isDishOfDay:false },where: {
                isDishOfDay: true
            }})
            food.isDishOfDay = true;
        }
        else{
            food.isDishOfDay = false;
        }   
        food.save();
        res.send("Updated");
    }
  });
};

exports.changeAvalilable = (req,res) => 
{
    Fooditem.findOne({where:{id: req.params.id}}).then(function (food)
    {
        food.isAvalilable = !food.available;
        res.send("Dish updated");
    }
    )
};
exports.changeDishOfDay = (req,res) =>
{
    Fooditem.update({values:{ isDishOfDay:false },where: {
        isDishOfDay: true }});
    Fooditem.findOne({where: {id: req.params.id}}).then(function(food)
    {
        food.isDishOfDay = true;
        food.save();
        res.send("Dish updated");
    });

};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
    Fooditem.findOne({where: {id: req.params.id}}).then(function (food)
    {
        food.delete();
        res.send("Dish deleted");
    });
};


