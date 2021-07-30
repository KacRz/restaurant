<template>
    <div class="form">
        <div class="form-container">
        <div class="form-button-close" @click="close()">
            <i class="far fa-times-circle" style="font-size:2.5em"></i>
        </div>
        <h2>
            Utwórz nowe danie
        </h2>
         <form 
            @submit.prevent="checkForm"
            method="post">
            <div class="selectBox">
                
            <div class="add-dish-form-input">
            <label for="Title">Nazwa dania </label>
                <input type="Title" v-model="Title" id="Title" class="add-dish-input" placeholder="Nazwa dnia" maxlength="30" required/>
            </div>
            <div class="add-dish-form-input">
                <label for="Description">Opis dania </label>
                <textarea type="Description" v-model="Description" id="Description" class="add-dish-input" placeholder="Opis" maxlength="60" required/>
            </div>
            <div class="add-dish-form-input">
                <label for="link">Odnośnik </label>
                <textarea type="link" v-model="link" id="link" class="add-dish-input" placeholder="Odnośnik do zdjęcia" maxlength="200" required/>
            </div>
            <div class="add-dish-form-input">
                <label for="Price">Cena </label>
                <input type="Price" v-model="Price" id="Price" class="add-dish-input" placeholder="Odnośnik do zdjęcia"  required/>
            </div>
                <label for="dish">kategoria dania</label>
                <select v-model="category" id="dish" required>
                    
                    <option disabled value=0>Wybierz kategorię dania</option>
                        <option v-bind:value="category.id" v-for="category in categories" v-bind:key="category.id" >{{ category.Name }}</option>
                </select>
            </div>
            <div>
                <label for="IsDishOfDay">Jest daniem dnia</label>
                <input type="checkbox" id="IsDishOfDay" value="IsDishOfDay" v-model="IsDishOfDay">
            </div>
            <div>
                <label for="isAvalilable">Jest dostępne</label>
                <input type="checkbox" id="isAvalilable" value="isAvalilable" v-model="isAvalilable">
            </div>
            <button type="submit" class="submit_button">Dodaj danie</button>
        </form>

        
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    props:{
    categories: {type:Object, required: true,},
    },
    data()
    {
        return{
            
        Title: '',
        Description:'',
        link: '',
        Price: 0.00,
        category: 0,
        IsDishOfDay: false,
        isAvalilable: false,}
        
    },
    methods:
    {
        close(){
            this.$emit('close');
        },
        checkForm()
        {

            if(!this.category)
            {
                console.log("Wybierz kategorię");
            }
            if(!this.Title || !this.Description || !this.link ||!this.category)
            {
                console.log("Wszystkie pola muszą być uzupełnione");
            }
            else{
                let data = 
                {
                Title: this.Title,
                Description: this.Description,
                link: this.link,
                Price: parseFloat(this.Price).toFixed(2),
                category: this.category,
                IsDishOfDay: this.IsDishOfDay,
                isAvalilable: this.isAvalilable,
                }
                this.$emit('response', data)
            }
        }
    },
}
</script>

<style scoped>
.form
{
    z-index:100;
    position:fixed;
    top: 12.5%;
    left: 12.5%;
    height: 75%;
    width: 75%;
}
.form-container
{
    
    border-radius: 15px;
    height:100%;
    background-color: rgba(0,0,0,0.8);
}


.submit_button {
    background-color: green;
    font-size: 1em;
    width: 20%;
    margin-top: 0.5em;
    margin-bottom: 1em;
    padding: 0.1em;
    color: white;

    border: none;
    border-radius: 5px;

    transition: 0.3s width;
}
.submit_button:hover {
    width: 25%;
    cursor: pointer;
}

.submit_button:active {
    background-color: rgb(9, 207, 9);;
}
.form-button-close
{
    margin-bottom: auto;
    position: absolute;
    right: 10px;
    top: 10%;
    display: flex;
}
.form-button-close:hover
{
    color: rgb(247, 162, 25)
}
.form-button-close:active
{
     color: rgb(255, 220, 163)
}
</style>