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
const moment = require('moment');

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


exports.fill_the_database_Users = (req, res) =>
{
UserType.create({NameType: "Klient", id: 1});
UserType.create({NameType: "Dostawca",id: 2});
UserType.create({NameType: "Obsługa",id: 3});
UserType.create({NameType: "Kierownik",id: 4});

User.create({email: "adamW@gmail.com", password: "123", firstname: "Adam", lastname: "Wesołowski", UserType_fk: 1, id:27});
User.create({email: "BrzeczyG@gmail.com", password: "123", firstname: "Grzegorz", lastname: "Brzęczystrzykiewicz", UserType_fk: 1, id:26});
User.create({email: "poirko@gmail.com", password: "123", firstname: "Dawid", lastname: "Piórko", UserType_fk: 1, id:25});
User.create({email: "Karolcia9128@gmail.com", password: "123", firstname: "Karolina", lastname: "Przbyszewka", UserType_fk: 1, id:24});
User.create({email: "Komandos4231@gmail.com", password: "123", firstname: "Karol", lastname: "Komadowski", UserType_fk: 1, id:23});
User.create({email: "Wesolek@gmail.com", password: "123", firstname: "Marcelina", lastname: "Wesołowska", UserType_fk: 1, id:22});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Bartosz", lastname: "Czekański", UserType_fk: 1, id:21});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Norbert", lastname: "Kret", UserType_fk: 1, id:20});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Hubert", lastname: "Kłoda", UserType_fk: 1, id:19});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Andrzej", lastname: "Piekarz", UserType_fk: 1, id:18});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Arkadiusz", lastname: "Król", UserType_fk: 1, id:17});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Barbara", lastname: "Kasprzyk", UserType_fk: 1, id:16});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Maria", lastname: "Węgiel", UserType_fk: 1, id:15});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Katarzyna", lastname: "Chleb", UserType_fk: 1, id:14});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Krzysztof", lastname: "Bułka", UserType_fk: 1,  id:13});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Ewa", lastname: "Stadny", UserType_fk: 1, id:12});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Zuzanna", lastname: "Pięta", UserType_fk: 1, id:12});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Zofia", lastname: "Trzmiel", UserType_fk: 1, id:11});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Oliwia", lastname: "Narutowicz", UserType_fk: 1, id:10});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Dominik", lastname: "Nazarko", UserType_fk: 1,  id:9});

User.create({email: "adamW@gmail.com", password: "123", firstname: "Zbigniew", lastname: "Niedzielski", UserType_fk: 2, id:8});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Damian", lastname: "Chrobry", UserType_fk: 2, id:7});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Adrian", lastname: "Reguła", UserType_fk: 2, id:6});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Aleksander", lastname: "Żuk", UserType_fk: 2, id:5});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Bogdan", lastname: "Sosna", UserType_fk: 3, id:4});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Oleg", lastname: "Ziobro", UserType_fk: 3, id:3});
User.create({email: "adamW@gmail.com", password: "123", firstname: "Joanna", lastname: "Wilk", UserType_fk: 3,id:2});
User.create({email: "KowalJan@gmail.com", password: "123", firstname: "Jan", lastname: "Kowalski", UserType_fk: 4, id:1});



res.send("Created users ");
}
exports.fill_the_database_Booking = (req, res) =>
{
    for(i = 1; i<=10; i++)
    {
        Table.create({Size: 4, id: i});
    }
    for(i = 11; i<=20; i++)
    {
        Table.create({Size: 2, id: i});
    }
       

    Booking.create({id: 1, ReservationStart: new Date( 2021, 6, 19, 10,00), ReservationEnd: new Date( 2021,6, 19, 11,00),Table_fk: 2, User_fk: 25});
    Booking.create({id: 2, ReservationStart: new Date( 2021, 6, 19, 11,00), ReservationEnd: new Date( 2021,6, 19, 12,00), Table_fk: 2, User_fk: 25});
    Booking.create({id: 3, ReservationStart: new Date( 2021, 6, 19, 12,00), ReservationEnd: new Date( 2021,6, 19, 13,00), Table_fk: 3, User_fk: 21});
    Booking.create({id: 4, ReservationStart: new Date( 2021, 6, 19, 13,00), ReservationEnd: new Date( 2021,6, 19, 14,00), Table_fk: 4, User_fk: 23});
    Booking.create({id: 5, ReservationStart: new Date( 2021, 6, 19, 14,00), ReservationEnd: new Date( 2021,6, 19, 15,00), Table_fk: 5, User_fk: 19});
    Booking.create({id: 6, ReservationStart: new Date( 2021, 6, 19, 15,00), ReservationEnd: new Date( 2021,6, 19, 16,00), Table_fk: 6, User_fk: 17});
    Booking.create({id: 7, ReservationStart: new Date( 2021, 6, 19, 16,00), ReservationEnd: new Date( 2021,6, 19, 17,00), Table_fk: 7, User_fk: 15});
    Booking.create({id: 8, ReservationStart: new Date( 2021, 6, 19, 17,00), ReservationEnd: new Date( 2021,6, 19, 18,00), Table_fk: 8, User_fk: 13});
    
    res.send("Created booking "+ new Date(2021, 7, 19, 10,00));
 


}
exports.fill_the_database_Address = (req, res) =>
{
    

    Address.create({id: 1,User_fk: 26, Country: 'Poland', City: 'Rzeszów',Street: 'maj. Lisa Kuli', HouseNumber: '22/404', PostalCode:'22-247'});
    Address.create({id: 2,User_fk: 24, Country: 'Poland', City: 'Rzeszów',Street: 'Majowa', HouseNumber: '2', PostalCode:'22-024'});
    Address.create({id: 3,User_fk: 22, Country: 'Poland', City: 'Kraków',Street: 'Polna', HouseNumber: '23/12', PostalCode:'18-236'});
    Address.create({id: 4,User_fk: 20, Country: 'Poland', City: 'Warszawa',Street: 'Słoneczna', HouseNumber: '99/88', PostalCode:'68-212'});
    Address.create({id: 5,User_fk: 18, Country: 'Poland', City: 'Szczecin',Street: 'Leśna', HouseNumber: '87/12', PostalCode:'15-217'});
    Address.create({id: 6,User_fk: 16, Country: 'Poland', City: 'Lublin',Street: 'Lipowa', HouseNumber: '90', PostalCode:'28-427'});

    
    res.send("Created booking "+ new Date(2021, 7, 19, 10,00));
 


}
exports.fill_the_database_Orders = (req, res) =>
{
    

    Order.create({id: 1,Address_fk: 2, Date: Date(2020, 6, 18)});
    Order.create({id: 2,Address_fk: 3, Date: Date(2020, 6, 18)});
    Order.create({id: 3,Address_fk: 4, Date: Date(2020, 6, 18)});



    OrderList.create({id: 1,Fooditem_fk: 1, Order_fk: 1, Quantity:1   ,StablePrice: 29.99});
    OrderList.create({id: 2,Fooditem_fk: 2, Order_fk: 1, Quantity:4   ,StablePrice: 39.99});
    OrderList.create({id: 3,Fooditem_fk: 3, Order_fk: 1, Quantity:5   ,StablePrice: 23.99});
    OrderList.create({id: 4,Fooditem_fk: 4, Order_fk: 1, Quantity:3   ,StablePrice: 26.99});
    OrderList.create({id: 5,Fooditem_fk: 5, Order_fk: 1, Quantity:2   ,StablePrice: 20.99});
    OrderList.create({id: 6,Fooditem_fk: 8, Order_fk: 2, Quantity:2   ,StablePrice: 18.99});
    OrderList.create({id: 7,Fooditem_fk: 9, Order_fk: 2, Quantity:4   ,StablePrice: 25.99});
    OrderList.create({id: 8,Fooditem_fk: 10, Order_fk: 2, Quantity:5  ,StablePrice: 10.00});
    OrderList.create({id: 9,Fooditem_fk: 10, Order_fk: 3, Quantity:6  ,StablePrice: 10.00});
    OrderList.create({id: 10,Fooditem_fk: 1, Order_fk: 3, Quantity:4  ,StablePrice: 29.99});
    OrderList.create({id: 11,Fooditem_fk: 2, Order_fk: 3, Quantity:3  ,StablePrice: 39.99});
    OrderList.create({id: 12,Fooditem_fk: 3, Order_fk: 3, Quantity:2  ,StablePrice: 23.99});
    
    res.send("Created booking "+ new Date(2021, 7, 19, 10,00));
 


}
exports.fill_the_database_Offerts = (req, res) =>
{
    

    Discount.create({id: 1,Price: 26, DateStart: new Date(2020, 6, 19), DateEnd: new Date(2031, 6, 19)});
    Discount.create({id: 2,Price: 24, DateStart: new Date(2021, 6, 22), DateEnd: new Date(2021, 6, 23)});
    Discount.create({id: 3,Price: 22, DateStart: new Date(2021, 6, 19), DateEnd: new Date(2021, 7, 24)});
    Discount.create({id: 4,Price: 20, DateStart: new Date(2021, 6, 30), DateEnd: new Date(2021, 7, 30)});
    Discount.create({id: 5,Price: 18, DateStart: new Date(2021, 6, 21), DateEnd: new Date(2021, 7, 11)});
    
    Category.create({id: 1,Name: 'Makarony'});
    Category.create({id: 2,Name: 'Pizza' });
    Category.create({id: 3,Name: 'Burgery' });
    Category.create({id: 4,Name: 'Napoje'});
    Category.create({id: 5,Name: 'Sałatki'});

    Fooditem.create({id: 1,Category_fk: 1, Discount_fk: null, Name: 'Spagetti Bolognese',Price: 29.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 2,Category_fk: 1, Discount_fk: null, Name: 'Spagetti Carbonare',Price: 39.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 3,Category_fk: 1, Discount_fk: null, Name: 'Spagetti z Tuńczykiem',Price: 23.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 4,Category_fk: 3, Discount_fk: null, Name: 'Hamburger',Price: 26.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 5,Category_fk: 3, Discount_fk: null, Name: 'Cheeseburger',Price: 20.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 6,Category_fk: 3, Discount_fk: null, Name: 'Amerykański burger',Price: 39.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 7,Category_fk: 2, Discount_fk: null, Name: 'Pizza margarita',Price: 15.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 8,Category_fk: 2, Discount_fk: null, Name: 'Pizza z Ananasem',Price: 18.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 9,Category_fk: 2, Discount_fk: null, Name: 'Pizza w stylu Nowojorskim',Price: 25.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 10,Category_fk: 4, Discount_fk: null, Name: 'Pepsi',Price: 10.00, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 11,Category_fk: 4, Discount_fk: null, Name: 'Mirinda',Price: 8.00, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 12,Category_fk: 5, Discount_fk: null, Name: 'Sałatka po grecku',Price: 8.99, isDishOfDay: false, IsAvalilable:true});
    Fooditem.create({id: 13,Category_fk: 5, Discount_fk: null, Name: 'Sałatka Cezar',Price: 9.99, isDishOfDay: false, IsAvalilable:true});


    res.send("Created booking "+ new Date(2021, 7, 19, 10,00));
 


}