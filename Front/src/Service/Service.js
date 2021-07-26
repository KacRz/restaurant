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
    static updateUserData(toke, dat) {
        try {
            return axios.put(url+'user/updateSmall',
            { data: dat },
            { headers: {"x-auth-token" :  toke}});
        }
        catch(err) {
            console.log(err);
        }
    }
}
export default Service;