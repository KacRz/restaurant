const { USER } = require("../config/db.config.js");


/*
Here we will make conections between tables in database
*/
module.exports = async () => {

    const User = require("./User.js");
    const UserType = require("./UserType.js");
    const Booking = require("./Booking.js");
    const Table = require("./Table.js");
    const Address = require("./Address.js");
    const Order = require("./Order.js");
    const OrderList = require("./OrderList.js");
    const Fooditem = require("./Fooditem.js");
    const Category = require("./Category.js");
    const Discount = require("./Discount.js");



    User.belongsTo(UserType,{foreignKey: 'UserType_fk', targetKey: 'id'});

    Booking.belongsTo(User,{foreignKey: 'User_fk', targetKey: 'id'});
    Booking.belongsTo(Table,{foreignKey: 'Table_fk', targetKey: 'id'});

    Address.belongsTo(User,{foreignKey: 'User_fk', targetKey: 'id'});
    
    Order.belongsTo(Address,{foreignKey: 'Address_fk', targetKey: 'id'});
   
    OrderList.belongsTo(Order,{foreignKey: 'Order_fk', targetKey: 'id'});
    OrderList.belongsTo(Fooditem,{foreignKey: 'Fooditem_fk', targetKey: 'id'});

    Fooditem.belongsTo(Category,{foreignKey: 'Category_fk', targetKey: 'id'});
    Fooditem.belongsTo(Discount,{foreignKey: 'Discount_fk', targetKey: 'id'});

}