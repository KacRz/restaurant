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
        }
    }
    //register
    static register()
    {

    }
}
export default Service;