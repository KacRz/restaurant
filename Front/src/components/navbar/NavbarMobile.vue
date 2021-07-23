<template>
    <div id="navMobile">
        <ul>
            <li>
                <router-link to="/login" class="link"><i class="fas fa-user icon"></i>Zaloguj się</router-link>
            </li>
            <li>
                <router-link to="/menu" class="link"><i class="fas fa-utensils icon"></i>Menu</router-link>
            </li>
            <li>
                <router-link to="/cart" class="link"><i class="fas fa-shopping-cart icon"></i>Koszyk ({{countCart}})</router-link>
            </li>
            <li>
                <router-link to="/reservation" class="link"><i class="fas fa-glass-cheers icon"></i>Rezerwacja</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "NavbarMobile",
    data() {
        return {

        }
    },
    computed: {
        countCart() {
            return this.$store.state.cart.cartItemCount;
        }
    }
}
</script>

<style scoped>
#navMobile {
    width: 200px;
    background-color: #1b1b1b;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-bottom-left-radius: 10px;
}
#navMobile ul {
    padding: 0;
    margin: 0;
}

#navMobile ul li{
    list-style: none;
    padding: 0.5em;
    margin: 2em 0;
    border-bottom: 1px solid rgb(255, 205, 124);

    text-align: left;
}

.icon {
    margin-right: 0.3em;
}

.link {
    text-decoration: none;
    font-weight: bold;
    color: rgb(255, 205, 124);
}

</style>