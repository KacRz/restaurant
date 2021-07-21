<template>
    <div class="cart-page">
        <div class="cart-page__title">
            <i class="fas fa-shopping-cart"></i>
            <span>Koszyk</span>
        </div>
        <div class="cart-page__content">

            <div v-if="countCart == 0" class="cart-page__empty">
                <span>Twój koszyk jest pusty. Śmiało, zamów coś!</span>
                <router-link to="/menu" class="cart-page__empty-btn">
                    Przejdź do menu
                    <i class="fas fa-arrow-circle-right"></i>
                </router-link>
            </div>

            <div v-else class="cart-page__info">
                <div v-for="item in cartItems" :key="item.id">
                    <Cartitem v-bind="item" @addProduct="addItem(item)" @removeProduct="removeItem(item)"/>
                </div>

                <Summary v-bind:totalPrice="totalPrice"/>
            </div>
            
        </div>
    </div>
</template>

<script>
import Cartitem from '../components/Cartitem.vue'
import Summary from '../components/Summary.vue'

export default {
    name: "Cart page",
    components: {
        Cartitem,
        Summary
    },
    data() {
        return { 
        }
    },
    methods: {
        addItem(item) {
            this.$store.dispatch("addToCart", item);
        },
        removeItem(item) {
            this.$store.dispatch("removeItem", item);
        }
    },
    computed: {
        cartItems() {
            return this.$store.state.cartItems;
        },
        totalPrice() {
            let price = 0;
            this.$store.state.cartItems.map(el => {
                price += el["quantity"] * el["price"]
            })
            return price;
        },
        countCart() {
            return this.$store.state.cartItemCount;
        }
    }
}
</script>

<style scoped>
.cart-page {
    width: 100%;
    background-color: brown;
    margin-top: 1em;

    border-radius: 10px;
    color: white;
    overflow: hidden;

    display: flex;
    flex-direction: column;
}
.cart-page__title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0.3em;
    font-size: 2em;
    
    border-bottom: 1px solid white;
}
.cart-page__title > span {
    padding-left: 0.3em;
}
.cart-page__content {
    display: flex;
    flex-direction: column;
    margin-top: 2em;
}
.cart-page__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1em;
    font-size: 1.3em;
}
.cart-page__empty-btn {
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    border-radius: 10px;
    font-size: 1.2em;
    margin: 0.5em;
    text-decoration: none;

    transition: padding 0.3s, background-color 0.3s;
}
.cart-page__empty-btn:hover {
    background-color: rgb(50, 187, 50);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}

@media (max-width: 750px) {
    .cart-page {
        font-size: 0.8em;
    }
}

</style>