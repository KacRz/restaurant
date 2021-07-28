<template>
    <div class="form"> 
        <div class="form-container">
        <div class="form-button-close" @click="close()">
            <i class="far fa-times-circle" style="font-size:2.5em"></i>
        </div>
        <h2>
            Usuwanie kategorii
        </h2>
         <form 
            @submit.prevent="checkForm"
            method="post">
            <div class="selectBox">
                <h2>Wybierz kategorię do usunięcia</h2>
                <select v-model="dishe" id="dish">
                    <option disabled value=0>Kategorię</option>
                        <option v-bind:value="categories.id" v-for="category in categories" v-bind:key="category.id" >{{ category.Name}}</option>
                </select>
            </div>
        <button type="submit" class="submit_button">Usuń kategorię</button>
        </form>

        
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    props:{
    categories: {type:Object, required: true,}
    },
    methods:
    {
        close(){
            this.$emit('close');
        },
        checkForm()
        {
            if(!this.Name)
            {
                this.errors.push('Musisz wypełnić pole');
            }
            else
            {
                console.log('No errors')
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
    width: 70%;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 0.1em;
    color: white;

    border: none;
    border-radius: 5px;

    transition: 0.3s width;
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