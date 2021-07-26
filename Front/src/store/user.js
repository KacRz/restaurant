

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
            if(dat =='' && state.userType =='Guest')
            {
                state.token = '';
                state.data.Email = '';
                state.data.Firstname = '';
                state.data.Lastname = '';
                state.Permissions = {};
                state.isLogged = dat.isLogged;
            }
            else{
                state.token = dat.token;
                state.Permissions = dat.Permissions;
                state.data.Email = dat.Email;
                state.data.Lastname = dat.LastName;
                state.data.Firstname = dat.FirstName;
                state.isLogged = dat.isLogged;

            }
        },
        setUserType(state, uType)
        {
            
            const types = ['Guest', 'Klient', 'Dostawca', 'Obsługa', 'Kierownik'];
            
            if(types.includes(uType) && typeof uType == 'string')
            {
                state.userType = uType;
            }
            else{
                state.userType = 'Guest';
            }
        }
        ,
        setIsLogged(state,status)
        {
            state.isLogged = status;
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
            context.commit("setUserType", '')
            context.commit("setData", '');
        },

    },

    getters: {
        getProducts (state) {
            return state.foodlist;
        },
        getMode (state)
        {
            return state.userType;
            
        },
        getLogged(state)
        {
            return state.isLogged;
        },
        getToken(state)
        {
            return state.token;
        }        ,
        getEmail(state)
        {
            return state.data.Email;
        },
        isManager(state){
            return (state.userType == 'Kierownik' && state.isLogged && state.token != '');
        },
        isStaff(state){
            return ((state.userType == 'Kierownik' || state.userType == 'Obsługa')&& state.isLogged && state.token != '');
        }
    }
    

}