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
            console.log(err);
            return {err};            
        }
    }
    static async setReservationTimes(toke,TableId, Dates)
    {
        try{
            return await axios.post(url+'user/all/'+TableId,{Dates} ,{ headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return {err};            
        }
    }
    static async createReservation(toke, data)
    {
        try{
            return await axios.post(url+'booking/create/',{data} ,{ headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return {err};            
        }
    }

}
export default ClientService;