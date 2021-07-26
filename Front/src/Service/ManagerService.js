const axios = require('axios');

const url = 'http://localhost:5000/'

class ManagerService
{
    static async getStaff(toke)
    {
        try{
            return await axios.get(url+'user/all/', { headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return {err};            
        }
    }
    static async addStaff(toke, dat)
    {
        try{
            return await axios.post(url+'user/addStaf/',{data: dat },{ headers: {"x-auth-token" :  toke}});
        }
        catch(err)
        {
            console.log(err);
            return {err};            
        }
    }
    static async delStaff(toke, uid)
    {
        console.log(uid)
        try{
            return await axios.delete(url+'user/del/'+uid, { headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return {err};            
        }
    }
    
}
export default ManagerService
