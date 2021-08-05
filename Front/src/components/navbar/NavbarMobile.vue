<template>
    <div id="navMobile">
        <ul>
            <li v-if="!logged">
                <router-link to="/login" class="link"><i class="fas fa-user icon"></i>Zaloguj się</router-link>
            </li>
            <li v-else>
                <router-link to="/" class="link" exact v-on:click="logOut()"><i class="fas fa-sign-out-alt"></i>Wyloguj się</router-link>
            </li>
            <li v-if="logged">
                <router-link to="/settings" class="link"><i class="fas fa-user icon"></i>Ustawienia</router-link>
            </li>
            <li v-if="isClient && logged">
                <router-link to="/order" class="link"><i class="fas fa-clipboard-list icon"></i>Zamówienia</router-link>
            </li>
            <li v-if="isManager || isStaff">
                <router-link to="/orderstaff" class="link"><i class="fas fa-clipboard-list icon"></i>Zamówienia</router-link>
            </li>
            <li>
                <router-link to="/menu" class="link"><i class="fas fa-utensils icon"></i>Menu</router-link>
            </li>
            <li v-if="isClient">
                <router-link to="/cart" class="link"><i class="fas fa-shopping-cart icon"></i>Koszyk ({{countCart}})</router-link>
            </li>
            <li v-if="isManager">
                <router-link to="/staff" class="link"><i class="fab fa-creative-commons-by"></i>Obsługa</router-link>
            </li>
            <li>
                <router-link to="/reservation" class="link"><i class="fas fa-glass-cheers icon"></i>Rezerwacja</router-link>
            </li>
             <li v-if="isClient">
                <router-link to="/reservation/history" class="link"><i class="fas fa-calendar-alt"></i>Historia rezerwacji</router-link>
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
        },
        logged()
        {
            return this.$store.getters['user/getLogged'];
        },
        isClient()
        {
            return (this.$store.getters['user/getMode'] == 'Guest' || this.$store.getters['user/getMode'] == 'Klient')
        },
        isManager()
        {
            return (this.$store.getters['user/getMode'] == 'Kierownik')

        },
        isStaff() {
            return (this.$store.getters['user/getMode'] == 'Obsługa')
        }
    },
    methods: {
        logOut()
        {
            this.$store.dispatch('user/LogOut');
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Wylogowano</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
                });
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