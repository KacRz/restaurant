<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">

        <h1>
            <span v-if="collapsed">
                <div>R</div>
            </span>
            <span v-else>Restauracja</span>
        </h1>
        
        <div class="sidebar-items">
            <SidebarLink to="/" icon="fas fa-home">Strona Główna</SidebarLink>
            <SidebarLink to="/login" icon="fas fa-user">Zaloguj się</SidebarLink>
            <SidebarLink to="/" icon="fas fa-utensils">Menu</SidebarLink>
            <SidebarLink to="/" icon="fas fa-shopping-cart">Koszyk</SidebarLink>
            <SidebarLink to="/" icon="fas fa-glass-cheers">Rezerwuj Stolik</SidebarLink>
        </div>

        <span 
        class="collapse-icon" 
        @click="toggleSidebar" 
        :class="{ 'rotate-180': collapsed }">
            <i class="fas fa-angle-double-left" />
        </span>
    </div>
</template>

<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
    props: {},
    components: {
        SidebarLink,
    },
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth }
    },
}
</script>

<style>
    :root {
        --sidebar-bg-color: brown;
        --sidebar-item-hover: rgb(182, 98, 65);
        --sidebar-item-active: rgb(161, 117, 117);
    }
</style>

<style scoped>
.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    /*box-sizing: border-box; */
    float: left;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;

    color: rgba(255, 255, 255, 0.7);

    transition: 0.2s linear;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}

</style>