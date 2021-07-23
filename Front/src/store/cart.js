
export const cart = {
    namespaced: true,
    state: {
        cartItemCount: 0,
        cartItems: [  ],
        foodlist: [
            {
                id: "1",
                title: "Mexicana",
                description: "Bardzo dobra pizza o niesamowitym smaku. Ciekawy wybór dla koneserów ostrej pizzy. Jedyna w swoim rodzaju.",
                price: "27.99",
                imgsource: "https://kuron.com.pl/wp-content/uploads/2019/03/P3251115.jpg.webp",
                number: "1",
            },
            {
                id: "2",
                title: "Neapolitana",
                description: "Pizza o bardzo wyrazistym smaku. Polecamy dla każdego fana zdrowego żywienia. Sos majonezowy dodatkowo podkreśla smak.",
                price: "22.99",
                imgsource: "https://fotokulinarnie.pl/wp-content/uploads/2021/02/IMG_4279-2-792x528.jpg?v=1612889508",
                number: "2"
            },
            {
                id: "3",
                title: "Diabolica",
                description: "Pizza bardzo bardzo ostra. Uwaga. Tylko dla fanów prawdziwego piekła.",
                price: "31.00",
                imgsource: "https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/pizza-grecka.jpg",
                number: "3"
            },
            {
                id: "4",
                title: "Hawajska",
                description: "Pizza tylko dla PRAWDZIWYCH koneserów. Ananas pokrojony w delikatne plasterki rozpływa się w ustach.",
                price: "36.00",
                imgsource: "https://st.depositphotos.com/1003814/5052/i/950/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg",
                number: "4"
            },
            {
                id: "5",
                title: "Margharita",
                description: "Podstawowa pizza. Bez żadnych dodatków, konserwantów. Czysty smak włoskiej pizzy.",
                price: "20.00",
                imgsource: "https://restaumatic-production.imgix.net/uploads/accounts/23308/media_library/26d6eb92-ef8e-4074-bd25-4b815272beda.jpg?auto=compress&blur=0&crop=focalpoint&fit=max&fp-x=0.5&fp-y=0.5&h=auto&rect=0%2C0%2C2000%2C1333&w=1920",
                number: "5"
            },
            {
                id: "6",
                title: "Brokoli",
                description: "Pizza z brokułami. Nic wielkiego.",
                price: "24.00",
                imgsource: "https://www.broilking.pl/files/blog/129/broil-king-pizza-z-grilla-d-b88c2458.jpg",
                number: "6"
            },
        ]
    },

    mutations: {
        addToCart(state, payload) {
            let item = payload;
            item = { ...item, quantity: 1 }
            if (state.cart.cartItems.length > 0) {
                let bool = state.cart.cartItems.some(i => i.id == item.id)
                if (bool) {
                    let itemIndex = state.cart.cartItems.findIndex(el => el.id === item.id)
                    state.cart.cartItems[itemIndex]["quantity"] += 1;
                } else {
                    state.cart.cartItems.push(item)
                }
            } else {
                state.cart.cartItems.push(item)
            }
            state.cart.cartItemCount++;
        },
        removeItem(state, payload) {
            let bool = state.cart.cartItems.some(i => i.id === payload.id);
            if (bool) {
                let index = state.cartItems.findIndex(el => el.id === payload.id);
                if (state.cart.cartItems[index]["quantity"] !== 0) {
                    state.cart.cartItems[index]["quantity"] -= 1;
                    state.cart.cartItemCount--;
                }
                if (state.cart.cartItems[index]["quantity"] === 0) {
                    state.cart.cartItems.splice(index, 1);
                }
            }
        }
    },

    actions: {
        addToCart: (context, payload) => {
            context.commit("addToCart", payload);
        },
        removeItem: (context, payload) => {
            context.commit("removeItem", payload);
        }
    },

    getters: {
        getProducts (state) {
            return state.foodlist;
        }
    }

}