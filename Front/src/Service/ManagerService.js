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
    
}
export default ManagerService
