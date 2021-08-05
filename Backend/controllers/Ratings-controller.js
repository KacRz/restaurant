const User = require("../models/User.js")
const Fooditem = require("../models/Fooditem.js")
const Rating = require("../models/Rating.js")

exports.create = async (req, res) => {
    const user = await User.findOne({where: {email: req.body.Email}});
    if (user == null) {
        return res.send('User doesnt exist');
    }
    Rating.create({
        Rating: req.body.Rating,
        Comment: req.body.Comment,
        Fooditem_fk: req.body.Fooditemid,
        User_fk: user.id
    })
    res.send("Dodano ocenę dania");
}

exports.getAllRatingsForOneFooditem = async (req, res) => {
    const allRatings = await Rating.findAll({where: {Fooditem_fk: req.params.id}, include: { model: User, attributes: [ 'firstname' ]}});
    if (allRatings == null) {
        return res.send('This rating doesnt exist');
    }
    res.status(200).send(allRatings);
}