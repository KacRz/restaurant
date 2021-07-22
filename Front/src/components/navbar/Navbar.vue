<template>
    <div id="nav">
        <div class="navMobile" :class="{'open':showNav}">
            <NavMobile />
        </div>
        <router-link to="/"><img src="@/assets/logo.jpg" alt="logo" ></router-link>
        <ul v-if="!mobileView">
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
        <div class="burger" v-else v-on:click="showNavigation" :class="{'bar':showNav}">
            <i class="fas fa-bars"></i>
        </div>
    </div>
</template>

<script>
import NavMobile from '../navbar/NavbarMobile.vue'

export default {
    name: "Navbar",
    data() {
        return {
            mobileView: true,
            showNav: false
        }
    },
    components: {
        NavMobile
    },
    methods: {
        handleView() {
            this.mobileView = window.innerWidth <= 880;
        },
        showNavigation() {
            this.showNav = !this.showNav;
        }
    },
    created() {
        this.handleView();
        window.addEventListener('resize', this.handleView);
    },
    computed: {
        countCart() {
            return this.$store.state.cart.cartItemCount;
        }
    }
}
</script>

<style scoped>
#nav {
    width: 100%;
    background-color: #1b1b1b;
    box-sizing: border-box;

    position: fixed;
    top: 0;
    left: 0;
    padding: 0.1em 1em;

    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 1s;
    z-index: 100;
}

.burger {
    font-size: 2em;
    margin-right: 0.6em;
    color: rgb(255, 205, 124);
    transition: 0.3s;
}

.burger:hover {
    cursor: pointer;
}

#nav ul {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
#nav ul li {
    position: relative;
    list-style: none;
}
#nav ul li .link {
    position: relative;
    text-decoration: none;
    font-weight: bold;
    margin: 0.3em;
    padding: 0.5em 1em;

    border-radius: 10px;
}
#nav img {
    width: 200px;
    height: auto;
    margin: 0;
    padding: 0;
}

.link {
  color: rgb(255, 205, 124);
}

.link:after {
    content: "";
    position: absolute;
    background-color: rgb(255, 205, 124);
    height: 3px;
    width: 0;
    left: 0;
    bottom: 0px;
    transition: 0.3s;
}

.link:hover:after {
    width: 100%;
}

.router-link-exact-active {
  color: chocolate;
}

.icon {
    margin-right: 0.3em;
}

.navMobile {
    padding: 0;
    margin: 0;
    position: absolute;
    top: 110px;
    right: -200px;

    transition: 0.5s;
}

.open {
    right: 0px;
}

.bar {
    font-size: 2.5em;
}

</style>