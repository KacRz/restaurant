const axios = require('axios');

const url = 'http://localhost:5000/'

class Service
{
    //login 
    static login(email, password)
    {
        try{
            console.log(email, password);
            return axios.post(url+'login/', {email, password});
        }
        catch(err)
        {
            console.log(err);
            return {isLogged: false};  
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
}
export default Service;