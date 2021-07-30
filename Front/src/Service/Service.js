const axios = require('axios');

const url = 'http://localhost:5000/'

class Service
{
    //login 
    static login(email, password)
    {
        try{
            return axios.post(url+'login/', {email, password});
        }
        catch(err)
        {
            console.log(err);

        }
    }
    //register
    static register(data)
    {
        try{
            return axios.post(url+'register/', {data});
        }
        catch(err)
        {
            console.log(err);
            return {isLogged: false};            
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
}
export default Service;