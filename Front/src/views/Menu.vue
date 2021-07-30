<template>
    <div class="menu">

    <div v-if="isStaff()" class="MenuManagment">
        <div class="dish-buttons"  @blur="blurField">
        <div class="MenuManagment-delete-button"  @click="focusField('DeleteDish')" >
            <span>Usuń danie </span><i class="fas fa-ban" ></i>
        </div>
        <div class="MenuManagment-add-button"  @click="focusField('AddDish')">
            <span>Dodaj danie </span><i class="far fa-save" ></i>
        </div>
        </div>
        <div class="category-buttons"> 
        <div class="MenuManagment-delete-button"  @click="focusField('DeleteCategory')">
            <span>Usuń kategorię </span><i class="fas fa-ban"></i>
        </div>
        <div class="MenuManagment-add-button"  @click="focusField('AddCategory')" > 
            <span>Dodaj kategorię</span><i class="far fa-save" ></i>
        </div>
        </div>
        <DeleteDish id ="DeleteDish" v-bind:categories= "productCategories" v-bind:dishes="productList"  v-show="showField('DeleteDish')" @close= blurField @response= deleteDish />
        <DeleteCategory id ="DeleteCategory" v-bind:categories= "productCategories"   v-show="showField('DeleteCategory')" @close= blurField @response= deleteCategory />
        <AddDish  id ="AddDish" v-bind:categories= "productCategories"  v-show="showField('AddDish')" @close= blurField @response= addDish />
        <AddCategory id ="AddCategory"  v-show="showField('AddCategory')" @close= blurField @response= addCategory />
        
    </div>

        <div class="menu-content">

            <div v-for="(category, index ) in productCategories" :key="index">

                <div class="menu-category__title">
                    <h1> {{ category.Name }}</h1>
                </div>
                <div class="menu-category__row">
                    <div class="menu-category__element" v-for="item in productCategoryItems[index]" :key="item.id" >
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

        isStaff()
        {
            return this.$store.getters['user/isStaff'];
        },
        blurField(){

            this.editField = '';
        },
        showField(name){

            return (this.editField == name)
        },
        focusField(name) {

            this.editField = name;
        },
        async deleteDish(data)
        {


            let tmp = {foodIndex:this.findByIdDish(data), catIndex: 0, incatIndex: 0 };
            tmp.catIndex = this.findByIdCategory(this.productList[tmp.foodIndex].Category_fk);
            tmp.incatIndex = this.findDishInCategory(tmp.catIndex,data);

            let temp = await StaffService.deleteDish(this.$store.getters['user/getToken'],{Foodnumber: this.productList[tmp.foodIndex].Foodnumber,
            Category: this.productList[tmp.foodIndex].Category_fk},this.productList[tmp.foodIndex].id);
            if(temp.status == '200')            
                this.alertHandler('Usunięto danie z menu');
            else{
                this.alertHandler('Nie usunięto dania z mneu, wystąpił błąd kod: ' + temp.status);
            }
            this.productList.splice(tmp.foodIndex,1);
            for(let i = tmp.foodIndex; i< this.productCategoryItems[tmp.catIndex].length; i++)
            {

                this.productCategoryItems[tmp.catIndex][i].Foodnumber = this.productCategoryItems[tmp.catIndex][i].Foodnumber-1;
            }
            this.productCategoryItems[tmp.catIndex].splice(tmp.incatIndex,1);


        },
        async addDish(data)
        {
            let temp = await StaffService.createDish(this.$store.getters['user/getToken'], data);
            if(temp.status == '200')            
                this.alertHandler('Dodano danie do menu');
            else{
                this.alertHandler('Nie dodano dania do menu, wystąpił błąd kod: ' + temp.status);
            }
            const tmp = await Service.menu();
            const tmp2 = await Service.category();
            this.productList=[];
            this.productCategories= [];
            this.productCategoryItems= [];

            Array.prototype.push.apply(this.productList, tmp.data);
            Array.prototype.push.apply(this.productCategories, tmp2.data);

            for (let i=0; i < this.productCategories.length; i++) {
                let temp = [];
                for (let j=0; j < this.productList.length; j++) {
                    if (this.productList[j].Category_fk == this.productCategories[i].id) {
                        temp.push(this.productList[j]);
                    }
                }
                this.productCategoryItems.push(temp);
            }
            
        },
        async deleteCategory(category)
        {

            let temp = await StaffService.delCategory(this.$store.getters['user/getToken'], category);
            if(temp.status == '200') 
            {      
                this.alertHandler('Usunięto kategorię oraz dania znajdujące się w kategorii');
                let tmp = this.findByIdCategory(category);
                for(let i = 0;i< this.productCategoryItems[tmp].length; i++)
                {
                    this.productList.splice(this.findByIdDish(this.productCategoryItems[tmp][i]),1);
                }
                this.productCategoryItems.splice(tmp, 1);
                this.productCategories.splice(tmp,1);
            } 
            else{
                this.alertHandler('Nie kategorii, wystąpił błąd, kod: ' + temp.status);
            }
            
        },
        async addCategory(catName)
        {
            let temp = await StaffService.addCategory(this.$store.getters['user/getToken'], catName);
            if(temp.status == '200') 
            {
                this.alertHandler('Utworzono nową kategorię');
                this.productCategories.push(catName);
            }           
            else{
                this.alertHandler('Nie kategorii, wystąpił błąd, kod: ' + temp.status);
            }
           


        },
        //return index in array of item or category
        findByIdCategory(catID)
        {
            for(let i = 0; i < this.productCategories.length; i++)
            {
                if(catID == this.productCategories[i].id)
                {
                    return i;
                }
            }
                return -1;

        },
        findByIdDish(dishID)
        {
            
            for(let i = 0; i < this.productList.length; i++)
            {
                if(dishID == this.productList[i].id)
                {
                    return i;
                }
            }
                return -1;

        },
        findDishInCategory(categoryIndex, dishID)
        {
            for(let i = 0; i < this.productCategoryItems[categoryIndex].length; i++)
            {

                if(dishID == this.productCategoryItems[categoryIndex][i].id)
                {
                    return i;
                }
            }
                return -1;
        },
        alertHandler(resp)
        {
            
               this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">'+ resp +'</h3></center>',
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
                })         

        },
    },
    watch: {
    

    },
    async created()
    {
        const tmp = await Service.menu();
        const tmp2 = await Service.category();

        Array.prototype.push.apply(this.productList, tmp.data);
        Array.prototype.push.apply(this.productCategories, tmp2.data);

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