const Fooditem = require("../models/Fooditem.js");

const  Opt  = require('sequelize')
const {Op} = require('sequelize')

exports.create = async (req, res) => {
    try{
    
    let max = await Fooditem.findAll({ where:{Category_fk: req.body.data.category},   attributes: [[Opt.fn('MAX', Opt.col('Foodnumber')), 'max']], group: ["Category_fk"],raw: true })
    //there is problem when category there is no fooditem in category - max will be undefinded [] 
    if(max[0] === undefined )
    {
        max = 0;
    }
    else 
        max = max[0].max
    
        Fooditem.findOne({ where: {Title: req.body.data.Title } }).then(async function (food) {
        
        if (!food) {
            
            await Fooditem.create({Title: req.body.data.Title, Price: req.body.data.Price, isAvalilable: req.body.data.isAvalilable,  Description: req.body.data.Description,
                IsDishOfDay: req.body.data.IsDishOfDay, imgsource: req.body.data.link,Foodnumber:max+1 ,  Category_fk: req.body.data.category})
            res.status(200).send("Created");

        }
        else {
            res.send("Logged in");
        }
 
    })

    }
    catch(err)
    {
        console.log(err);
            res.status(399).send(err);
    }

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


