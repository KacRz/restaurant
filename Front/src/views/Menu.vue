<template>
    <div class="menu">
        <div class="menu-content">

            <div v-for="category in productCategories" :key="category.id">

                <div class="menu-category__title">
                    <h1> {{ category.Name }} </h1>
                </div>
                <div class="menu-category__row">
                    <div class="menu-category__element" v-for="item in productCategoryItems[category.id-1]" :key="item.id" >
                        <Fooditem v-bind="item" v-on:click="foodDetails(item)" />
                    </div>

                    
                </div>
            
            </div>
        </div>
    </div>
</template>

<script>
import Fooditem from '../components/Fooditem.vue'

import Service from '../Service/Service.js'

export default {
    name: "Menu",
    data() {
        return {
            isHidden: true,
            clickedItem: '',
            productList: [],
            productCategories: [],
            productCategoryItems: []
        }
    },
    components: {
        Fooditem,
    },
    setup() {
    },
    methods: {
        foodDetails(item) {
            this.$router.push({
                name: 'food-details', params: item
            })
        },
        addItemToCart() {
            this.$store.dispatch("cart/addToCart", this.products[this.clickedItem]);
        },

    },
    async created()
    {
        const tmp = await Service.menu();
        const tmp2 = await Service.category();

        Array.prototype.push.apply(this.productList, tmp.data);
        Array.prototype.push.apply(this.productCategories, tmp2.data);

        // I know this is bad but i dunno how to do it :( 

        for (let i=0; i < this.productCategories.length; i++) {
            let temp = [];
            for (let j=0; j < this.productList.length; j++) {
                if (this.productList[j].Category_fk == this.productCategories[i].id) {
                    temp.push(this.productList[j]);
                }
            }
            this.productCategoryItems.push(temp);
        }

    }
}
</script>

<style scoped>
.menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.menu-category {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;

}
.menu-category__row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.menu-category__element {
    padding: 0.5em;
    flex: 1;
}
.menu-category__title {
    width: 100%;
    padding-left: 6em;
    box-sizing: border-box;

    background-color: #2d2d2d;
    color: rgb(255, 205, 124);

    display: flex;
    justify-content: flex-start;
}

@media (max-width: 660px) {
    .menu-category__element {
        width: 100%;
        min-width: 250px;
        max-width: 450px;
    }
}
@media (max-width: 1100px) {
    .menu-category__element {
        min-width: 300px;
        max-width: 450px;
    }
}
@media (min-width: 1101px) {
    .menu-category__element {
        min-width: 300px;
        max-width: 350px;
    }
}


</style>