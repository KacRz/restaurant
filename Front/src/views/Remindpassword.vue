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
export default {
    name: 'Remindpassword',
    data() {
        return {
            email: ''
        }
    },
    methods: {
        handleSubmit() {
            const data = this.email;

            console.log('Remind password form submitted');
            console.log(data);
        }
    }
}
</script>

<style scoped>
.remindpassword-page {
    background-color: rgb(192, 81, 81);
    width: 40em;
    margin-top: 1em;
    box-sizing: border-box;

    color: rgb(56, 27, 27);

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
    background-color: rgb(160, 68, 68);
    width: 100%;
    color: rgb(0, 0, 0);
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
    background-color: rgb(31, 15, 12);
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