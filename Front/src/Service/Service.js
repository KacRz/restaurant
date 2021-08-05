const axios = require('axios');

const url = 'http://localhost:5000/'

class Service
{
    //login 
    static async login(email, password)
    {
        try{
            return await axios.post(url+'login/', {email, password})
        }
        catch(err)
        {
            if (err.response) {
                return {Status: err.response.status, Error: err.response.data.Error};
            } else if (err.request) {
                return err.request;
            } else {
                return err.message;
            }
            
        }
    }

    //register
    static async register(data)
    {
        try{
            return await axios.post(url+'register/', {data});
        }
        catch(err)
        {
            if (err.response) {
                return {Status: err.response.status, Error: err.response.data.Error, isLogged: false};
            } else if (err.request) {
                console.log(err.request);
                return err.request;
            } else {
                return err.message;
            }        
        }
    }
    static menu()
    {
        try{
            return axios.get(url+'fooditem/');
        }
        catch(err)
        {
            console.log(err);
        }
    }
    // pobranie kategorii z menu
    static category()
    {
        try {
            return axios.get(url+'categories/');
        }
        catch(err)
        {
            console.log(err);
        }
    }
    static getAddresses(email)
    {
        try {
            return axios.get(url+'address/'+email);
        }
        catch(err) {
            console.log(err);
        }
    }
    static addNewAddress(toke, email, dat) {
        try {
            return axios.post(url+'address/addtoclient/',
            {data: dat, email},
            { headers: {"x-auth-token" :  toke}});
        }
        catch(err) {
            console.log(err);
        }
    }
    static deleteAddress(toke, adresid) {
        try {
            return axios.delete(url+'address/delete/'+adresid,
            { headers: {"x-auth-token" :  toke}});
        }
        catch(err) {
            console.log(err);
        }
    }
    static updateUserData(toke, dat, email) {
        try {
            return axios.put(url+'user/updateSmall/'+email,
            { data: dat },
            { headers: {"x-auth-token" :  toke}});
        }
        catch(err) {
            console.log(err);
        }
    }
    static getUserData(toke, email) {
        try {
            return axios.get(url+'user/getSmalldata/'+email,
            { headers: {"x-auth-token" :  toke}});
        }
        catch(err) {
            console.log(err);
        }
    }
    static createNewOrder(dat) {
        try {
            return axios.post(url+'orders/create/',
                { data: dat })
        }
        catch(err) {
            console.log(err);
        }
    }
    static createNewOrderForGuest(dat) {
        try {
            return axios.post(url+'orders/createforguest/',
            { data: dat })
        }
        catch(err) {
            console.log(err);
        }
    }
    static getOrders(email) {
        try {
            return axios.get(url+'orders/findbymail/'+email)
        }
        catch(err) {
            console.log(err);
        }
    }
    static getOrderList(id) {
        try {
            return axios.get(url+'order/findbyorderid/'+id)
        }
        catch(err) {
            console.log(err);
        }
    }
    static getUserByAddress(id) {
        try {
            return axios.get(url+'user/getuserbyaddress/'+id)
        }
        catch(err) {
            console.log(err);

        }
    }
    static changeStatus(id) {
        try {
            return axios.get(url+'order/changestatus/'+id)
        }
        catch(err) {
            console.log(err);
        }
    }
    static getStatus(id) {
        try {
            return axios.get(url+'order/getstatus/'+id)
        }
        catch(err) {
            console.log(err);
        }
    }
    static getRestaurantInfo() {
        try {
            return axios.get(url+'restaurantinfo/')
        }
        catch(err) {
            console.log(err);
        }
    }
    static addNewRestaurantInfo(type, value) {
        try {
            return axios.post(url+'restaurantinfo/addnew',
                { infoType: type, infoValue: value });
        }
        catch(err) {
            console.log(err);
        }
    }
    static deleteRestaurantInfo(id) {
        try {
            return axios.delete(url+'restaurantinfo/delete/'+id)
        }
        catch(err) {
            console.log(err);
        }
    }
    static resetPassword(email) {
        try {
            return axios.post(url+'resetpassword',{email: email})
        }
        catch(err) {
            console.log(err);
        }
    }
    static changePassword(email, oldpassword, newpassword) {
        try {
            return axios.post(url+'changepassword', {email: email, oldpassword: oldpassword, newpassword: newpassword})
        }
        catch(err) {
            return err;
        }
    }
    static deleteOrder(id) {
        try {
            return axios.post(url+'deleteorder', {id: id})
        }
        catch(err) {
            return err;
        }
    }
    static addRating(email, rating, comment, fooditemid) {
        try {
            return axios.post(url+'rating/add', 
                { Email: email,
                  Rating: rating,
                  Comment: comment,
                  Fooditemid: fooditemid })
        }
        catch(err) {
            return err;
        }
    }
    static async getRatings(id) {
        try {
            return await axios.get(url+'rating/get/'+id)
        }
        catch(err) {
            return err;
        }
    }
}

export default Service;