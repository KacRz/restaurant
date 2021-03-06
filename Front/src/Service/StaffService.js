const axios = require('axios');

const url = 'http://localhost:5000/'

class StaffService
{
    static async changeAvailbility(toke,id, isavailable)
    {
        try{
            return await axios.put(url+'fooditem/aval/'+id,{isavailable},{ headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);         
            return err;            
        }
    }
    static async changeDescription(toke, id, dat)
    {
        try{
            return await axios.post(url+'fooditem/chDescription/'+id,{data: dat },{ headers: {"x-auth-token" :  toke}});
        }
        catch(err)
        {
            console.log(err);            
            return err;            
        }
    }
    static async changeDishOfDay(toke,id, dishofday)
    {
        try{
            return await axios.put(url+'fooditem/dishofday/'+id,{dishofday},{ headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);            
            return err;            
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
            return err;            
        }
    }

    static async addCategory(toke, dat)
    {
        try{
            return await axios.post(url+'categories/create/',{data:dat}, { headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return err;            
        }
    }
    static async delCategory(toke, id)
    {
        try{
            return await axios.delete(url+'categories/del/'+id, { headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {
            console.log(err);
            return err;            
        }
    }
    
    static async deleteDish(toke,dat, id)
    {
        try{
            return await axios.post(url+'fooditem/del/'+id,{data:dat}, { headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {

            return err;            
        }
    }
    static async createDish(toke, dat)
    {
        try{
            return await axios.post(url+'fooditem/create/',{data: dat}, { headers: {"x-auth-token" :  toke} });
        }
        catch(err)
        {

            return err;            
        }
    }
    static async getTodaysOrders() {
        try {
            return await axios.get(url+'stafforder/gettoday/');
        }
        catch(err) {
            return err;
        }
    }
    static async getReservations(toke)
    {
        try {
            return await axios.get(url+'booking/allforstaff/',{ headers: {"x-auth-token" :  toke}});
        }
        catch(err) {
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
export default StaffService
