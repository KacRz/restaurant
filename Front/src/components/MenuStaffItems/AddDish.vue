<template>
    <div>
        <h2>
            Utwórz nowe danie
        </h2>
         <form 
            class="form" 
            @submit.prevent="checkForm"
            method="post">
            <div class="selectBox">
                
            <div class="add-dish-form-input">
            <label for="Title">Nazwa dania</label>
                <input type="Title" v-model="Title" id="Title" class="add-dish-input" placeholder="Nazwa dnia" required/>
            </div>
            <div class="add-dish-form-input">
                <label for="Description">Opis dania</label>
                <input type="Description" v-model="Description" id="Description" class="add-dish-input" placeholder="Opis" required/>
            </div>
            <div class="add-dish-form-input">
                <label for="link">Odnośnik</label>
                <input type="link" v-model="link" id="link" class="add-dish-input" placeholder="Odnośnik do zdjęcia" required/>
            </div>
                <select v-model="dishe" id="dish">
                    <option disabled value=0>Wybierz kategorię dania</option>
                        <option v-bind:value="category.id" v-for="category in categories" v-bind:key="category.id" >{{ category.Name }}</option>
                </select>
            </div>
        </form>

        <button type="submit" class="submit_button">Dodaj danie</button>

    </div>
</template>

<script>
export default {
    name:"",
    props:{
    categories: {type:Object, required: true,},
    }
}
</script>

<style scoped>

.submit_button {
    background-color: green;
    font-size: 1em;
    width: 70%;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 0.1em;
    color: white;

    border: none;
    border-radius: 5px;

    transition: 0.3s width;
}
</style>