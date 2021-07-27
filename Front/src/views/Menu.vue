<template>
    <div class="menu">
    <div v-if="isStaff()" class="MenuManagment">
        <div class="dish-buttons"  @blur="blurField">
        <div class="MenuManagment-delete-button"  @click="focusField('DeleteDish')" @blur="blurField">
            <span>Usuń danie </span><i class="fas fa-ban" ></i>
        </div>
        <div class="MenuManagment-add-button"  @click="focusField('AddDish')" @blur="blurField">
            <span>Dodaj danie </span><i class="far fa-save" ></i>
        </div>
        </div>
        <div class="category-buttons"> 
        <div class="MenuManagment-delete-button"  @click="focusField('DeleteCategory')" @blur="blurField">
            <span>Usuń kategorię </span><i class="fas fa-ban"></i>
        </div>
        <div class="MenuManagment-add-button"  @click="focusField('AddCategory')" @blur="blurField"> 
            <span>Dodaj kategorię</span><i class="far fa-save" ></i>
        </div>
        </div>
        <DeleteDish v-bind:categories= "productCategories" v-bind:dishes="productList"  v-show="showField('DeleteDish')"   @blur="blurField"/>
        <DeleteCategory v-bind:categories= "productCategories"   v-show="showField('DeleteCategory')"  @blur="blurField"/>
        <AddDish v-bind:categories= "productCategories"  v-show="showField('AddDish')"  @blur="blurField"/>
        <AddCategory   v-show="showField('AddCategory')"  @blur="blurField"/>
        
    </div>
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

import DeleteDish from '../components/MenuStaffItems/DeleteDish.vue'
import DeleteCategory from '../components/MenuStaffItems/DeleteCategory.vue'
import AddDish from '../components/MenuStaffItems/AddDish.vue'
import AddCategory from '../components/MenuStaffItems/AddCategory.vue'
export default {
    name: "Menu",
    data() {
        return {
            isHidden: true,
            clickedItem: '',
            productList: [],
            productCategories: [],
            productCategoryItems: [],
            editField: '',
        }
    },
    components: {
        Fooditem,
        DeleteDish,
        DeleteCategory,
        AddDish,
        AddCategory
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
        isStaff()
        {
            return this.$store.getters['user/isStaff'];
        },
        focusField(name){
            this.editField = name;
                
        },
        blurField(){
            this.editField = '';
        },
        showField(name){
            return (this.editField == name)
        },

    },
    async created()
    {
        const tmp = await Service.menu();
        const tmp2 = await Service.category();

        Array.prototype.push.apply(this.productList, tmp.data);
        Array.prototype.push.apply(this.productCategories, tmp2.data);

        // I know this is bad but i dunno how to do it better :( 

        for (let i=0; i < this.productCategories.length; i++) {
            let temp = [];
            for (let j=0; j < this.productList.length; j++) {
                if (this.productList[j].Category_fk == this.productCategories[i].id) {
                    temp.push(this.productList[j]);
                }
            }
            this.productCategoryItems.push(temp);
        }
        console.log(this.productCategories);
        console.log(this.productList);

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
.MenuManagment
{
     width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.3em;
    margin-bottom: 0.3em;
    background-color: #2d2d2d;
    color: rgb(255, 205, 124);
}
.dish-buttons
{
margin-right: 10%;
display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
.category-buttons
{
margin-left: 10%;
display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
.MenuManagment-delete-button
{
    background-color: red;
    color: white;
    padding: 0.5em 1.2em;
    margin: 0 0.3em;
    border-radius: 10px;
    font-size: 1.2em;

    transition: padding 0.3s, background-color 0.3s;

}
.MenuManagment-delete-button:hover
{
background-color: rgb(187, 50, 50);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}
.MenuManagment-delete-button:active
{
    background-color: rgb(235, 38, 38);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}
.MenuManagment-add-button
{
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    margin: 0 0.3em;
    border-radius: 10px;
    font-size: 1.2em;

    transition: padding 0.3s, background-color 0.3s;
    
}
.MenuManagment-add-button:hover
{
    background-color: rgb(50, 187, 50);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}
.MenuManagment-add-button:active
{
    background-color: rgb(38, 235, 38);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
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