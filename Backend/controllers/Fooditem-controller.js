const Fooditem = require("../models/Fooditem.js");
const  Op  = require('sequelize')

exports.create = async (req, res) => {
    console.log(req.body)
    let max = await Fooditem.findAll({ where:{Category_fk: req.body.data.category},   attributes: [Op.fn('MAX', Op.col('Foodnumber'))], group: ["Category_fk"],raw: true })
            console.log(max);
    Fooditem.findOne({ where: {Title: req.body.data.Title } }).then(async function (food) {
        
        if (!food) {
            
            await Fooditem.create({Title: req.body.data.Title, Price: req.body.data.Price, isAvalilable: req.body.data.isAvalilable, 
                IsDishOfDay: req.body.data.IsDishOfDay, imgsource: req.body.data.link,  Category_fk: req.body.data.category})
            res.status(200).send("Created");
        }
        else {
            res.status(400).send("Dish Exists");
        }
 
    }).catch((err)=>
    {
        console.log(err);
        res.status(399).send(err);
    });
};
// Find a single type with an id
exports.find= async (req, res) => {
  res.status(200).send(await Fooditem.findOne({where: {id: req.params.id}}));
};
exports.returnAll= async(req, res) => {
    res.status(200).send(await Fooditem.findAll());
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
        res.status(200).send("Updated");
    }
  }).catch((err)=>
  {
      res.status(400).send("Error occured");
  });
};
exports.changeDescription = async (req, res) => {
    await Fooditem.findOne({where: {id: req.params.id}}).then( async function (food)
    {
        
      if(!food)
      {   
        res.status(400).send("Dish not found");
      }
      else{
        food.Title = req.body.data.Title;
        food.Price = req.body.data.Price;
        food.Description = req.body.data.Description;
        await food.save();
        res.status(200).send("Updated");
      }
    }).catch(err)
    {
        console.log(err);
        res.status(400).send("Error occured");
    };
  };

exports.changeAvalilable = async (req,res) => 
{
    console.log(req.body)
    await Fooditem.findOne({where:{id: req.params.id}}).then(async function (food)
    {
        
        food.isAvalilable = req.body.isavailable;
        await food.save();
        res.status(200).send("Dish updated");
    }
    ).catch((err)=>
    {
        res.status(400).send("Error occured");
    });
};
exports.changeDishOfDay = async (req,res) =>
{
    console.log(req.body)
    await Fooditem.findOne({where: {id: req.params.id}}).then(async function(food)
    {
        if(req.body.dishofday)
        {
            Fooditem.update({values:{ IsDishOfDay:false },where: {
                IsDishOfDay: true
            }})
            food.IsDishOfDay = true;
        }
        else{
            food.IsDishOfDay = false;
        }   
        await food.save();
        res.status(200).send("Dish updated");
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });

};

// Delete a type with the specified id in the request
exports.delete = async (req, res) => {
    try{
    let tmp = await Fooditem.findOne({where:{id: req.params.id}});
    tmp.destroy();

    await Fooditem.update({Foodnumber:sequelize.literal('Foodnumber - 1')},{where:{Category_fk: req.body.data.Category, Foodnumber:{[Op.gte]: req.body.data.Foodnumber}}})
    res.status(200).send("Dish deleted");
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send("Error occured");
    }
};


