import { createStore } from 'vuex';
import {cart} from './cart'
import { user } from './user'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const persUser = createPersistedState({paths:['user', 'cart'],
getItem: (key) => Cookies.get(key),
setItem: (key, value) =>
Cookies.set(key, value, { expires: 3, secure: true }),
removeItem: (key) => Cookies.remove(key)});

export const store = createStore({

    modules:
    {
        cart: cart,
        user: user,

    },
    plugins: [persUser]
})