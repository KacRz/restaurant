<template>
  <div class="remindpassword-page">
      
      <form 
            class="remindpassword-page__form" 
            @submit.prevent = "handleSubmit" 
            method="post">

            <div class="remindpassword-page__title">
                <h3>Przypomnij hasło</h3>
            </div>
            
            <div class="remindpassword-page__form-info">
                <span>W celu odzyskania hasła, wpisz adres email podany podczas rejestracji. Na maila otrzymasz dalsze instrukcje jak ukończyć proces zmiany hasła.</span>
            </div>

            <div class="remindpassword-page__form-group">
                <label for="email">Email*</label>
                <input type="email" v-model="email" id="email" class="remindpassword-page__input" placeholder="Email" required/>
            </div>

            <button type="submit" class="remindpassword-page__button">Wyślij</button>
        </form>

  </div>
</template>

<script>
import Service from '../Service/Service'

export default {
    name: 'Remindpassword',
    data() {
        return {
            email: ''
        }
    },
    methods: {
        async handleSubmit() {
            console.log('Remind password form submitted');
            await Service.resetPassword(this.email);
        }
    }
}
</script>

<style scoped>
.remindpassword-page {
    background: #1b1b1b;
    width: 40em;
    margin-top: 1em;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;

    color: rgb(255, 205, 124);

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 10px;
    font-size: 1.1em;
}

.remindpassword-page__form {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.remindpassword-page__title {
    background-color: #2d2d2d;
    width: 100%;
    color: rgb(255, 205, 124);
}

.remindpassword-page__form-group {
    margin-top: 1em;
    padding: 0 0.5em;
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.remindpassword-page__form-info {
    margin-top: 1em;
    padding: 0 0.5em;
    width: 80%;

    font-size: 0.8em;
    text-align: justify;
}

.remindpassword-page__input {
    font-size: 1em;
    width: 80%;

    padding: 0.3em;

    border: none;
}

.remindpassword-page__button {
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

.remindpassword-page__button:hover {
    width: 75%;
    cursor: pointer;
}

.remindpassword-page__button:active {
    background-color: rgb(46, 38, 37);;
}

</style>