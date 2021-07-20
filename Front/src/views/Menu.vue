<template>
    <div class="menu">

        <div class="menu-category">
            <div class="menu-category__title">
                <h1>Pizze</h1>
            </div>
            <div class="menu-category__element" v-for="item in products" :key="item.id">
                <!--<Fooditem v-bind="item" v-on:click="onClickedItem(item.id)"/>-->
                <Fooditem v-bind="item" v-on:click="foodDetails(item)" />
            </div>
            
            <AdditemToCart v-if="!isHidden" v-bind="products[clickedItem]" @closeNow="closeWindow" @addToCart="addItemToCart"/>
            
        </div>

    </div>
</template>

<script>
import Fooditem from '../components/Fooditem.vue'
import AdditemToCart from '../components/AddItemToCart.vue'

export default {
    name: "Menu",
    data() {
        return {
            isHidden: true,
            clickedItem: '',    
        }
    },
    components: {
        Fooditem,
        AdditemToCart
    },
    setup() {

    },
    methods: {
        foodDetails(item) {
            this.$router.push({
                name: 'food-details', params: item
            })
        },
        onClickedItem(id) {
            this.isHidden = !this.isHidden;
            this.clickedItem = --id;
        },
        closeWindow() {
            this.isHidden = true;
        },
        addItemToCart() {
            this.$store.dispatch("addToCart", this.products[this.clickedItem]);
        },
    },
    computed: {
        products() {
            return this.$store.getters.getProducts;
        }
    }
}
</script>

<style scoped>
.menu {
    display: flex;
    justify-content: center;
}

.menu-category {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;

    padding: 0.5em;
}
.menu-category__element {
    padding: 1em;
}
.menu-category__title {
    width: 100%;
    padding-left: 4em;

    background: rgb(165,42,42);
    background: linear-gradient(146deg, rgba(165,42,42,1) 0%, rgba(140,49,49,1) 75%, rgba(165,42,42,1) 100%);
    color: white;

    display: flex;
    justify-content: flex-start;
}

</style>