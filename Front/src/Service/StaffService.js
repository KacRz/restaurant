const axios = require('axios');

const url = 'http://localhost:5000/'

class ManagerService
{
    static async changeAvailbility(toke,id)
    {
        try{
            return await axios.put(url+'fooditem/Available/'+id,{ headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return {err};            
        }
    }
    static async changeDishOfDay(toke,id)
    {
        try{
            return await axios.put(url+'fooditem/Available/'+id,{ headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return {err};            
        }
    }
    static async changeDescription(toke, id, dat)
    {
        try{
            return await axios.post(url+'user/descritpion/:id',{data: dat },{ headers: {"x-auth-token" :  toke}});
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
