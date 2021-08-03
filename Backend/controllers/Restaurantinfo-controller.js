const Restaurantinfo = require("../models/Restaurantinfo.js")

exports.getInfo = (req, res) => {
    Restaurantinfo.findAll().then(async function(info) {
        res.send(info);
    });
};

exports.addNew = (req, res) => {
    Restaurantinfo.create({
        type: req.body.infoType,
        value: req.body.infoValue
    })
    res.send("Info added");
}

exports.delete = (req, res) => {
    Restaurantinfo.findOne({where: {id: req.params.infoid}}).then(async function (info) {
        info.destroy();
        res.send("Info deleted");
    })
}