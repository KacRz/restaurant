const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

User = global.sequelize.define("User", {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING(128)
        },
        firstname: {
            type: Sequelize.STRING(50)
        },
        lastname: {
            type: Sequelize.STRING(50)
        },
        
    });
User.prototype.validPassword = async function(password) {
        
        return await bcrypt.compare(password, this.password);        
    }
User.addHook('beforeCreate',  async function(user) {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
    })
User.prototype.hashPass = async function() {
    const salt = await bcrypt.genSalt(10); //whatever number you want
    this.password = await bcrypt.hash(this.password, salt);
}
User.prototype.generateAuthToken = async function()
{
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    return token.toString().valueOf();
}


module.exports = User;
    
