<template>
    <div>
        <h2>
            Usuń wybrane danie
        </h2>
         <form 
            class="form" 
            @submit.prevent="checkForm"
            method="post">
            <div class="selectBox">
                <h2>Wybierz danie do usunięcia</h2>
                <select v-model="dishe" id="dish">
                    <option disabled value=0>Wybierz danie do usunięcia</option>
                        <option v-bind:value="dishes.id" v-for="dish in dishes" v-bind:key="dish.id" >{{ dish.Title }}</option>
                </select>
            </div>
        </form>

        <button type="submit" class="submit_button">Usuń danie</button>

    </div>
</template>

<script>
export default {
    name:"",
    props:{
    categories: {type:Object, required: true,},
    dishes:{type:Object, required: true,}
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