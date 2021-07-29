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
                <select v-model="category" id="category">
                    <option disabled value=-1>Kategorię</option>
                        <option v-bind:value="categor.id" v-for="categor in categories" v-bind:key="categor.id" >{{ categor.Name}}</option>
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
    data()
    {
        return{
            category: '',
        }
        
    },
    methods:
    {
        close(){
            this.$emit('close');
        },
        checkForm()
        {
            console.log(this.category)
            if(!this.category)
            {
               console.log('Musisz wypełnić pole');
            }
            else
            {
                this.$emit('response', this.category);
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
    background-color: red;
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
    background-color: rgb(146, 67, 67);
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