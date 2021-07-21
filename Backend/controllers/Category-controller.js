const Category = require("../models/Category.js");

exports.create = (req, res) => {
  Category.findOne({where: {Name: req.body.name} }).then(function(cat)
  {
    if(!cat)
    {
        Category.create({Name: req.body.name});
    }
    else
    {
        res.send("Category Exists");
    }
  });
};

exports.returnAll = (req,res)=>{
    res.send(Category.findAll());

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
  Category.findOne({where: {id: req.params.id} }).then(function(cat)
  {
  if(!cat)
    {
        res.send("Category doesn't exists");
    }
    else
    {
        cat.dalete();
        res.send("Deleted");
    }
});
};
