const Category = require("../models/Category.js");
const Fooditem = require("../models/Fooditem.js");
exports.create = (req, res) => {
  Category.findOne({where: {Name: req.body.data} }).then(function(cat)
  {
    if(!cat)
    {
        Category.create({Name: req.body.data});
    }
    else
    {
        res.send("Category Exists");
    }
  });
};

exports.returnAll = async (req,res)=>{
    res.send(await Category.findAll());

}
// Update a type by the id in the request
exports.update = (req, res) => {
    Category.findOne({where: {id: req.body.id} }).then(function(cat)
  {
    if(!cat)
    {
        res.send("Category doesn't exists")
    }
    else
    {
        cat.Name = req.body.name;
        cat.save();
        res.send("Updated");
    }
  });
};

// Delete a type with the specified id in the request
exports.delete = (req, res) => {
try{  Category.findOne({where: {id: req.params.id} }).then(function(cat)
  {
  if(!cat)
    {
        res.status(200).send("Category doesn't exists");
    }
    else
    {
        Fooditem.destroy({where:{Category_fk: req.params.id}});
        cat.destroy();
        res.status(200).send("Deleted");
    }
  })
  }
  catch(err)
  {
    res.status(400).send(err);
  }

};
