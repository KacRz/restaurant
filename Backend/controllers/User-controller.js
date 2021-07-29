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
const { Op } = require("sequelize");

exports.validateUser = async (req, res) => {
    User.findOne({ where: {email: req.body.email } }).then(async function (user) {
        if (!user) {
            res.status(400).send({Error:"Invalid Email and/or Password", isLogged: false});
            //res.redirect('/login');
        }
        else if (!(await user.validPassword(req.body.password)) ) {
            res.status(400).send({Error:"Invalid Email and/or Password", isLogged: false});
            //res.redirect('/login');
        } else {
            const tok = await user.generateAuthToken();
            data={
                isLogged: true,
                Email: user.email,
                FirstName: user.firstname,
                LastName: user.lastname,
                UserType: await UserType.findOne({attributes: ['NameType'], where:{id: user.UserType_fk}}).then(async function (user){return user.NameType}),
                token: tok
            }
            res.status(200).send(data);

        }
 
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });
    
    
};
// Create and Save a new User - register or create
exports.create = async (req, res) => {
    User.findOne({ where: {email: req.body.data.email } }).then(async function (user)
    {
        if(!user)
        {
           var id = await User.create({
                email: req.body.data.email,
                password: req.body.data.password,
                firstname: req.body.data.firstname,
                lastname: req.body.data.lastname,
                UserType_fk: 1
            }).id;
            await Address.create({
                User_fk: id,
                Country: "Poland",
                City: req.body.data.City,
                Street: req.body.data.Street,
                HouseNumber: req.body.data.HouseNumber,
                PostalCode: req.body.data.PostalCode               
            });
            res.send("user created");
        }
        else{
            //create response thath user with that e-mail exists
            res.send("user Exists");
        }
        
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });
    
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    User.findAll({attributes: ['id', 'UserType_fk','firstname','lastname', 'email'],where: {[Op.not]: [{UserType_fk: 1}]}}).then(function (users) {
        res.send(users);
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });;
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    await User.findOne({attributes: ['id', 'UserType_fk','firstname','lastname', 'email'],where: {id: req.params.id}}).then(async function (user)
    {
        res.send(user);
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });;
};

exports.updateSmall = async(req, res) => {

    User.findOne({ where: {email: req.params.email} }).then(async function (user)
    {
        if (!user) {
            res.send("user doesnt exist");
        }
        else {
            user.firstname = req.body.data.firstname;
            user.lastname = req.body.data.lastname;
            await user.save();
            res.send("user updated");
        }

    })
}

exports.getSmalldata = async(req, res) => {
    console.log(req.params.email);
    User.findOne({ where: {email: req.params.email} }).then(async function (user) {
        res.send(user);
    })

    .catch((err)=>
    {
        res.status(400).send("Error occured");
    });


}

// Update a User by the id in the request
exports.update = async (req, res) => {

    User.findOne({ where: {id: req.body.id } }).then(async function (user)
    {
        console.log(user);
        if(!user)
        {
            res.send("user doesnt exists");
        }
        else{
            user.id = req.body.id;
            user.email = req.body.email;
            user.password = req.body.password;
            await user.hashPass();
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname
            await user.save();
            res.send("user updated");
        }        
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) =>  {
    await User.findOne({where: {id: req.params.id}}).then(async function (user)
    {
        user.destroy();
        res.send("user detroyed");
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  //its dangerous to create it
};

exports.createStaff = async (req, res) =>  {
    await User.findOne({where: {email: req.body.data.email}}).then(async function (user)
    {

        if(user)
        {
            res.status(400).send("user exists");
        }
        else{
            try{
                await User.create({
                    email: req.body.data.email,
                    password: req.body.data.password,
                    firstname: req.body.data.firstname,
                    lastname: req.body.data.lastname,
                    UserType_fk: req.body.data.usertype,
                }).id;        
                res.status(200).send("user created");
             }
            catch(err){
                res.status(400).send("Error occured"+err);
            }
        }
    }).catch((err)=>
    {
        res.status(400).send("Error occured");
    });
};





exports.fill_the_database_Users = (req, res) =>
{
UserType.create({NameType: "Klient", id: 1});
UserType.create({NameType: "Dostawca",id: 2});
UserType.create({NameType: "Obsługa",id: 3});
UserType.create({NameType: "Kierownik",id: 4});
UserType.create({NameType: "Niezarejestrowany", id: 100});

User.create({email: "adamW@gmail.com", password: "123", firstname: "Adam", lastname: "Wesołowski", UserType_fk: 1, id:27});
User.create({email: "BrzeczyG@gmail.com", password: "123", firstname: "Grzegorz", lastname: "Brzęczystrzykiewicz", UserType_fk: 1, id:26});
User.create({email: "poirko@gmail.com", password: "123", firstname: "Dawid", lastname: "Piórko", UserType_fk: 1, id:25});
User.create({email: "Karolcia9128@gmail.com", password: "123", firstname: "Karolina", lastname: "Przbyszewka", UserType_fk: 1, id:24});
User.create({email: "Komandos4231@gmail.com", password: "123", firstname: "Karol", lastname: "Komadowski", UserType_fk: 1, id:23});
User.create({email: "Wesolek@gmail.com", password: "123", firstname: "Marcelina", lastname: "Wesołowska", UserType_fk: 1, id:22});
User.create({email: "Czekan@gmail.com", password: "123", firstname: "Bartosz", lastname: "Czekański", UserType_fk: 1, id:21});
User.create({email: "Kretek@gmail.com", password: "123", firstname: "Wojciech", lastname: "Kret", UserType_fk: 1, id:20});
User.create({email: "Huberk@gmail.com", password: "123", firstname: "Hubert", lastname: "Kłoda", UserType_fk: 1, id:19});
User.create({email: "Adnrzej123@gmail.com", password: "123", firstname: "Andrzej", lastname: "Piekarz", UserType_fk: 1, id:18});
User.create({email: "Krola@gmail.com", password: "123", firstname: "Arkadiusz", lastname: "Król", UserType_fk: 1, id:17});
User.create({email: "Barbarak@gmail.com", password: "123", firstname: "Barbara", lastname: "Kasprzyk", UserType_fk: 1, id:16});
User.create({email: "Carbon@gmail.com", password: "123", firstname: "Maria", lastname: "Węgiel", UserType_fk: 1, id:15});
User.create({email: "Kate6819@gmail.com", password: "123", firstname: "Katarzyna", lastname: "Chleb", UserType_fk: 1, id:14});
User.create({email: "Bulek@gmail.com", password: "123", firstname: "Krzysztof", lastname: "Bułka", UserType_fk: 1,  id:13});
User.create({email: "EwaS@gmail.com", password: "123", firstname: "Ewa", lastname: "Stadny", UserType_fk: 1, id:12});
User.create({email: "PietkaZ@gmail.com", password: "123", firstname: "Zuzanna", lastname: "Pięta", UserType_fk: 1, id:12});
User.create({email: "Trzmielu@gmail.com", password: "123", firstname: "Zofia", lastname: "Trzmiel", UserType_fk: 1, id:11});
User.create({email: "OliwerQ@gmail.com", password: "123", firstname: "Oliwia", lastname: "Narutowicz", UserType_fk: 1, id:10});
User.create({email: "Domino687@gmail.com", password: "123", firstname: "Dominik", lastname: "Nazarko", UserType_fk: 1,  id:9});

User.create({email: "DjZibi@gmail.com", password: "123", firstname: "Zbigniew", lastname: "Niedzielski", UserType_fk: 2, id:8});
User.create({email: "Damain1234@gmail.com", password: "123", firstname: "Damian", lastname: "Chrobry", UserType_fk: 2, id:7});
User.create({email: "RegulaA@gmail.com", password: "123", firstname: "Adrian", lastname: "Reguła", UserType_fk: 2, id:6});
User.create({email: "Aleks@gmail.com", password: "123", firstname: "Aleksander", lastname: "Żuk", UserType_fk: 2, id:5});
User.create({email: "Bohdan@gmail.com", password: "123", firstname: "Bogdan", lastname: "Sosna", UserType_fk: 3, id:4});
User.create({email: "ZiobOO@gmail.com", password: "123", firstname: "Oleg", lastname: "Ziobro", UserType_fk: 3, id:3});
User.create({email: "Wiq@gmail.com", password: "123", firstname: "Joanna", lastname: "Wilk", UserType_fk: 3,id:2});
User.create({email: "KowalJan@gmail.com", password: "123", firstname: "Jan", lastname: "Kowalski", UserType_fk: 4, id:1});



res.send("Created users ");
}
exports.fill_the_database_Booking = (req, res) =>
{
    for(i = 1; i<=10; i++)
    {
        Table.create({Size: 2, id: i});
    }
    for(i = 11; i<=14; i++)
    {
        Table.create({Size: 4, id: i});
    }
       

    Booking.create({id: 1, ReservationStart: new Date( 2021, 6, 27, 10,00), ReservationEnd: new Date( 2021,6, 27, 12,00),Table_fk: 2, User_fk: 25});
    Booking.create({id: 2, ReservationStart: new Date( 2021, 6, 27, 11,00), ReservationEnd: new Date( 2021,6, 27, 13,00), Table_fk: 2, User_fk: 25});
    Booking.create({id: 3, ReservationStart: new Date( 2021, 6, 27, 12,00), ReservationEnd: new Date( 2021,6, 27, 14,00), Table_fk: 3, User_fk: 21});
    Booking.create({id: 4, ReservationStart: new Date( 2021, 6, 27, 13,00), ReservationEnd: new Date( 2021,6, 27, 15,00), Table_fk: 4, User_fk: 23});
    Booking.create({id: 5, ReservationStart: new Date( 2021, 6, 27, 14,00), ReservationEnd: new Date( 2021,6, 27, 16,00), Table_fk: 5, User_fk: 19});
    Booking.create({id: 6, ReservationStart: new Date( 2021, 6, 27, 15,00), ReservationEnd: new Date( 2021,6, 27, 17,00), Table_fk: 6, User_fk: 17});
    Booking.create({id: 7, ReservationStart: new Date( 2021, 6, 27, 16,00), ReservationEnd: new Date( 2021,6, 27, 18,00), Table_fk: 7, User_fk: 15});
    Booking.create({id: 8, ReservationStart: new Date( 2021, 6, 27, 17,00), ReservationEnd: new Date( 2021,6, 27, 19,00), Table_fk: 8, User_fk: 13});
    
    res.send("Created booking "+ new Date(2021, 7, 27, 10,00));
 


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



    OrderList.create({id: 1,  Quantity:1   ,StablePrice: 29.99,Fooditem_fk: 1,  Order_fk: 1,});
    OrderList.create({id: 2,  Quantity:4   ,StablePrice: 39.99,Fooditem_fk: 2,  Order_fk: 1,});
    OrderList.create({id: 3,  Quantity:5   ,StablePrice: 23.99,Fooditem_fk: 3,  Order_fk: 1,});
    OrderList.create({id: 4,  Quantity:3   ,StablePrice: 26.99,Fooditem_fk: 4,  Order_fk: 1,});
    OrderList.create({id: 5,  Quantity:2   ,StablePrice: 20.99,Fooditem_fk: 5,  Order_fk: 1,});
    OrderList.create({id: 6,  Quantity:2   ,StablePrice: 18.99,Fooditem_fk: 8,  Order_fk: 2,});
    OrderList.create({id: 7,  Quantity:4   ,StablePrice: 25.99,Fooditem_fk: 9,  Order_fk: 2,});
    OrderList.create({id: 8,  Quantity:5   ,StablePrice: 10.00,Fooditem_fk: 10, Order_fk: 2,});
    OrderList.create({id: 9,  Quantity:6   ,StablePrice: 10.00,Fooditem_fk: 10, Order_fk: 3,});
    OrderList.create({id: 10, Quantity:4   ,StablePrice: 29.99,Fooditem_fk: 1,  Order_fk: 3,});
    OrderList.create({id: 11, Quantity:3   ,StablePrice: 39.99,Fooditem_fk: 2,  Order_fk: 3,});
    OrderList.create({id: 12, Quantity:2   ,StablePrice: 23.99,Fooditem_fk: 3,  Order_fk: 3,});
    
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

    Fooditem.create({id: 1,Category_fk: 1, Discount_fk: null, Title: 'Bolognese',Price: 29.99, IsDishOfDay: false, isAvalilable:true, 
        Description: 'mięso wołowe, pomidory, przyprawy', Foodnumber: '1', 
        imgsource: 'https://images.unsplash.com/photo-1571175534150-72cd2b5a6039?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'});
    Fooditem.create({id: 2,Category_fk: 1, Discount_fk: null, Title: 'Carbonara',Price: 39.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'bekon, śmietana, przyprawy', Foodnumber: '2',
        imgsource: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'});
    Fooditem.create({id: 3,Category_fk: 1, Discount_fk: null, Title: 'Tuńczyk',Price: 23.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'tuńczyk, cebula, przyprawy', Foodnumber: '3',
        imgsource: 'https://images.unsplash.com/photo-1581228258201-fe6e5861d1f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'});
    Fooditem.create({id: 14,Category_fk: 1, Discount_fk: null, Title: 'Szpinak',Price: 28.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'szpinak, śmietana, przyprawy', Foodnumber: '4',
        imgsource: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1103&q=80'});
    Fooditem.create({id: 15,Category_fk: 1, Discount_fk: null, Title: 'Meksyk',Price: 30.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'mięso wołowe, jalapeno, pomidory, przyprawy', Foodnumber: '5',
        imgsource: 'https://images.unsplash.com/photo-1601565960311-8a7f4e1ab709?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'});
    Fooditem.create({id: 4,Category_fk: 3, Discount_fk: null, Title: 'Hamburger',Price: 26.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'mięso wołowe, sałata, cebula, sos', Foodnumber: '1',
        imgsource: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=902&q=80'});
    Fooditem.create({id: 5,Category_fk: 3, Discount_fk: null, Title: 'Cheeseburger',Price: 20.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'mięso wołowe, ser żółty, sałata, cebula, sos', Foodnumber: '2',
        imgsource: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1093&q=80'});
    Fooditem.create({id: 6,Category_fk: 3, Discount_fk: null, Title: 'Amerykański burger',Price: 39.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'mięso wołowo-wieprzowe, sałata, cebula, pomidor, boczek, sos amerykański', Foodnumber: '3',
        imgsource: 'https://images.unsplash.com/photo-1576843776838-032ac46fbb93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1015&q=80'});
    Fooditem.create({id: 7,Category_fk: 2, Discount_fk: null, Title: 'Pizza margharita',Price: 15.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'sos, ser żółty, przyprawy', Foodnumber: '1',
        imgsource: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'});
    Fooditem.create({id: 8,Category_fk: 2, Discount_fk: null, Title: 'Pizza z Ananasem',Price: 18.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'sos, ser żółty, ananas, oliwki, salami, przyprawy', Foodnumber: '2',
        imgsource: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80'});
    Fooditem.create({id: 9,Category_fk: 2, Discount_fk: null, Title: 'Pizza w stylu Nowojorskim',Price: 25.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'sos, ser żółty, salami, kiełbasa, kukurydza, pomidor ,przyprawy', Foodnumber: '3',
        imgsource: 'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80'});
    Fooditem.create({id: 10,Category_fk: 4, Discount_fk: null, Title: 'Cola',Price: 10.00, IsDishOfDay: false, isAvalilable:true,
        Description: 'Napój cola 1l', Foodnumber: '1',
        imgsource: 'https://images.unsplash.com/photo-1605712916345-6ef6bcc2e29c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29sYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'});
    Fooditem.create({id: 11,Category_fk: 4, Discount_fk: null, Title: 'Pomarańcz',Price: 8.00, IsDishOfDay: false, isAvalilable:true,
        Description: 'Napój pomarańczowy 1l', Foodnumber: '2', 
        imgsource: 'https://images.unsplash.com/photo-1593817124586-f8196427ba6a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'});
    Fooditem.create({id: 12,Category_fk: 5, Discount_fk: null, Title: 'Sałatka po grecku',Price: 8.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'pomidory, ogórki, cebula, feta, oregano', Foodnumber: '1',
        imgsource: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZWNlJTIwc2FsYWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'});
    Fooditem.create({id: 13,Category_fk: 5, Discount_fk: null, Title: 'Sałatka Cezar',Price: 9.99, IsDishOfDay: false, isAvalilable:true,
        Description: 'sałata rzymska, grzanki, parmezan', Foodnumber: '2',
        imgsource: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=631&q=80'});


    res.send("Created booking "+ new Date(2021, 7, 19, 10,00));
 


}