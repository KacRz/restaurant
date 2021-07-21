<template>
    <div id="nav">
        <span class="nav-title">Restauracja</span>
        <ul>
            <li><router-link to="/" class="link">Strona główna</router-link></li>
            <li><router-link to="/login" class="link">Zaloguj się</router-link></li>
            <li><router-link to="/menu" class="link">Menu</router-link></li>
            <li><router-link to="/cart" class="link">Koszyk</router-link></li>
            <li><router-link to="/reservation" class="link">Rezerwacja</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        handleScroll() {
            let navbar = document.getElementById("nav");
            navbar.classList.toggle("sticky", window.scrollY > 0);
        },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    
    }
}
</script>

<style scoped>
#nav {
    width: 100%;
    background-color: brown;
    box-sizing: border-box;

    position: fixed;
    top: 0;
    left: 0;
    padding: 2em;

    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 1s;
    z-index: 100;
}
#nav .sticky {
    padding: 1em;
}
.nav-title {
    position: relative;
    color: white;
    font-size: 2em;
    font-weight: 700;
    transition: 1s;
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
    margin: 0.2em;
}
</style>