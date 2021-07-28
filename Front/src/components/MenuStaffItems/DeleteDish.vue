<template>
    <div class="form">
        <div class="form-container">
        <div class="form-button-close" @click="close()">
            <i class="far fa-times-circle" style="font-size:2.5em"></i>
        </div>
        <h2>
            Usuń wybrane danie
        </h2>
         <form 
            @submit.prevent="checkForm"
            method="post">
            <div class="selectBox">
                <h2>Wybierz danie do usunięcia</h2>
                <select v-model="dish" id="dish">
                    <option disabled value=0>Wybierz danie do usunięcia</option>
                        <option v-bind:value="dish.id" v-for="dish in dishes" v-bind:key="dish.id" >{{ dish.Title }}</option>
                </select>
            </div>
            <button type="submit" class="submit_button">Usuń danie</button>
        </form>

        
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    props:{
    categories: {type:Object, required: true,},
    dishes:{type:Object, required: true,}
    },
    data()
    {
        return{
            dish: 0,
        }
    },
    methods:
    {
        close(){
            this.$emit('close');
        },
        checkForm()
        {
            if(this.dish==0)
            {
                console.log(this.dish + "AAA")
            }
            else
            {
                this.$emit('response',this.dish);
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