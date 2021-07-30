<template>
    <div class="form">
        <div class="form-container">
        <div class="form-button-close" @click="close()">
            <i class="far fa-times-circle" style="font-size:2.5em"></i>
        </div>
        <h2>
            Utwórz nową kategorię dania
        </h2>
         <form 
            @submit.prevent="checkForm"
            method="post">
            <div class="add-dish-form-input">
            <label for="Name">Nazwa kategorii dania</label>
                <input type="Name" v-model="Name" id="Name" class="add-dish-input" placeholder="Name" required maxlength="20"/>
            </div>
            <button type="submit" class="submit_button">Dodaj kategorię</button>
        </form>

        
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data()
    {
        return {
            Name: ''
            }
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
                console.log('Musisz wypełnić pole');
            }
            else
            {
                this.$emit('response', this.Name);
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