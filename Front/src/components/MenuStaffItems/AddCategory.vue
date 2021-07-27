<template>
    <div class="form">
        <div class="form-container">
        <h2>
            Utwórz nową kategorię dania
        </h2>
         <form 
             
            @submit.prevent="checkForm"
            method="post">
            <div class="add-dish-form-input">
            <label for="Name">Nazwa kategorii dania</label>
                <input type="Name" v-model="Name" id="Namee" class="add-dish-input" placeholder="Name" required/>
            </div>
        </form>

        <button type="submit" class="submit_button">Dodaj kategorię</button>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    
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
    background-color: rgba(0,0,0,0.8);
}
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