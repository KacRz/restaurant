
export const user = {
    namespaced: true,
    state: {
        isLogged: false,
        data: {
            Email: '',
            Firstname:'',
            Lastname: '',
        },
        token: '',
        userType: 'Guest',    
        Permissions:{

        }
    },

    mutations: {
        setData(state,dat)
        {
            if(dat =='' && this.state.user.userType =='Guest')
            {
                this.state.user.token = '';
                this.state.user.data.Email = '';
                this.state.user.data.Firstname = '';
                this.state.user.data.Lastname = '';
                this.state.user.Permissions = {};
                this.state.user.isLogged = dat.isLogged;
            }
            else{
                this.state.user.token = dat.token;
                this.state.user.Permissions = dat.Permissions;
                this.state.user.data.Email = dat.Email;
                this.state.user.data.Lastname = dat.LastName;
                this.state.user.data.Firstname = dat.FirstName;
                this.state.user.isLogged = dat.isLogged;

            }
        },
        setUserType(state, uType)
        {
            
            const types = ['Guest', 'Klient', 'Dostawca', 'Obsługa', 'Kierownik'];
            
            if(types.includes(uType) && typeof uType == 'string')
            {
                this.state.user.userType = uType;
            }
            else{
                this.state.user.userType = 'Guest';
            }
        }
        ,
        setIsLogged(status)
        {
            this.state.user.isLogged = status;
        },
  
    },

    actions: {
        SignIn:(context, payload)=>
        {

            context.commit("setUserType", payload.UserType);
            context.commit("setData", payload);
        },
        LogOut:(context)=>
        {
            context.setUserType('');
            context.setData('');

        },
    },

    getters: {
        getProducts (state) {
            return state.foodlist;
        }
    }
    

}