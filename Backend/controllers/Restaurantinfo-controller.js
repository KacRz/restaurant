const Restaurantinfo = require("../models/Restaurantinfo.js")

exports.getInfo = (req, res) => {
    try{
        Restaurantinfo.findAll().then(async function(info) {
        res.status(200).send(info);
    })}
    catch{
        res.status(400).send(err);
    }

};

exports.addNew = (req, res) => {
    try{
    Restaurantinfo.create({
        type: req.body.infoType,
        value: req.body.infoValue
    })
    res.status(200).send("Info added");
}
catch(err)
{
    res.status(400).send(err);
}

}

exports.delete = (req, res) => {
    try{
    Restaurantinfo.findOne({where: {id: req.params.infoid}}).then(async function (info) {
        info.destroy();
        res.status(200).send("Info deleted");
    })
}
catch(err)
{
    res.status(400).send(err);
}
}