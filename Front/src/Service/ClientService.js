const axios = require('axios');
const url = 'http://localhost:5000/';


class ClientService
{
    static async getReservationTimes(toke)
    { 
        try{
            return await axios.get(url+'booking/all/', { headers: {"x-auth-token" :  toke} });
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
    static async setReservationTimes(toke,TableId, Dates)
    {
        try{
            return await axios.post(url+'user/all/'+TableId,{Dates} ,{ headers: {"x-auth-token" :  toke} });
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
    static async createReservation(toke, data)
    {
        try{
            return await axios.post(url+'booking/create/',{data} ,{ headers: {"x-auth-token" :  toke} });
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
    static async deleteReservation(toke, id)
    {
        try{
            return await axios.delete(url+'booking/del/'+id ,{ headers: {"x-auth-token" :  toke} });
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
    static async getAllClientReservations(toke, email)
    {
        try{
            return await axios.get(url+'booking/user/'+email, {headers: {"x-auth-token" :  toke}});
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

}
export default ClientService;