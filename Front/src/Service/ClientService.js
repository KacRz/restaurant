const axios = require('axios');
const url = 'http://localhost:5000/';


class ClientService
{
    static async getReservationTimes(toke,TableId)
    { 
        try{
            return await axios.get(url+'booking/id/'+TableId, { headers: {"x-auth-token" :  toke} });
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


}
export default ClientService;