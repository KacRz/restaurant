const Address= require("../models/Address.js");
const Booking= require("../models/Booking.js");
const Category = require("../models/Category.js");
const Discount = require("../models/Discount.js");
const Fooditem = require("../models/Fooditem.js");
const Order = require("../models/Order.js");
const OrderList = require("../models/OrderList.js");
const Table = require("../models/Table.js");
const User = require("../models/User.js");
const UserType = require("../models/UserType.js");
const db = require("../models/index.js");
const Restaurant = db.Restaurant;
//const Op = db.Sequelize.Op;

const router = require("express").Router();

// Create and Save a new User
exports.create = (req, res) => {
    res.send("I'm a pirate");
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
};

// Find a single User with an id
exports.findOne = (req, res) => {
  
};

// Update a User by the id in the request
exports.update = (req, res) => {
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    res.send("I gonna be the very best");
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};


exports.fill_the_database = (req, res) =>
{
UserType.create({NameType: "Klient"});
UserType.create({NameType: "Dostawca"});
UserType.create({NameType: "Obsługa"});
UserType.create({NameType: "Kierownik"});

User.create({email: "adamW@gmail.com", password: "123", firstname: "Adam", lastname: "Wesołowski", UserType_fk: 0})

res.send("Created");
}