import { createStore } from 'vuex';
import {cart} from './cart'
import { user } from './user'
export const store = createStore({

    modules:
    {
        cart: cart,
        user: user,

    }

})