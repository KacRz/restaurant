<template>
    <div class="register-page">

        <form class="register-page__form" @submit.prevent="handleSubmit">
            <div class="register-page__title">
                <h3>Nie masz konta? Załóż je!</h3>
            </div>
            <div class="register-page__form-title">
                <h4>1. Dane logowania</h4>
            </div>
            <div class="register-page__form-group">
                <label for="email">Email*</label>
                <input type="email" v-model="email" id="email" class="register-page__input" placeholder="Email" />
            </div>
            <div class="register-page__form-group">
                <label for="password">Hasło*</label>
                <input type="password" v-model="password" id="password" class="register-page__input" placeholder="Hasło" />
            </div>
            <div class="register-page__form-group">
                <label for="password2">Powtórz hasło*</label>
                <input type="password" v-model="password2" id="password2" class="register-page__input" placeholder="Powtórz hasło" />
            </div>
            <div class="register-page__form-title">
                <h4>2. Twoje dane</h4>
            </div>
            <div class="register-page__form-group">
                <label for="firstname">Imię*</label>
                <input type="text" v-model="firstname" id="firstname" class="register-page__input" placeholder="Imię" />
            </div>
            <div class="register-page__form-group">
                <label for="lastname">Nazwisko*</label>
                <input type="text" v-model="lastname" id="lastname" class="register-page__input" placeholder="Nazwisko" />
            </div>
            <div class="register-page__form-group">
                <label for="city">Miasto*</label>
                <input type="text" v-model="city" id="city" class="register-page__input" placeholder="Miasto" />
            </div>
            <div class="register-page__form-group">
                <label for="street">Ulica*</label>
                <input type="text" v-model="street" id="street" class="register-page__input" placeholder="Ulica" />
            </div>
            <div class="register-page__form-group">
                <label for="housenumber">Numer domu/mieszkania*</label>
                <input type="text" v-model="housenumber" id="housenumber" class="register-page__input" placeholder="Nr domu/mieszkania" />
            </div>
            <div class="register-page__form-group">
                <label for="postalcode">Kod pocztowy*</label>
                <input type="text" v-model="postalcode" id="postalcode" class="register-page__input" placeholder="xx-xxx" />
            </div>

            <button type="submit" class="register-page__button">Zarejestruj</button>

        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
            password2: '',
            firstname: '',
            lastname: '',
            city: '',
            street: '',
            housenumber: '',
            postalcode: ''
        }
    },
    methods: {
        handleSubmit() {
            const data = {
                email: this.email,
                password: this.password,
                password2: this.password2,
                firstname: this.firstname,
                lastname: this.lastname,
                city: this.city,
                street: this.street,
                housenumber: this.housenumber,
                postalcode: this.postalcode,
            }
            console.log('Register form submitted');
            console.log(data);
        }
    },
    setup() {
        
    },
}
</script>

<style scoped>
.register-page {
    background-color: rgb(192, 81, 81);
    width: 40em;
    margin-top: 3em;
    box-sizing: border-box;

    color: rgb(56, 27, 27);

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 10px;
    font-size: 1.1em;
}

.register-page__form {
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

.register-page__title {
    background-color: rgb(160, 68, 68);
    width: 100%;
    color: rgb(0, 0, 0);
}

.register-page__form-group {
    margin-top: 1em;
    padding: 0 0.5em;
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.register-page__input {
    font-size: 1em;
    width: 80%;

    padding: 0.3em;

    border: none;
}

.register-page__button {
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

.register-page__button:hover {
    width: 75%;
    cursor: pointer;
}

.register-page__form-title {
    width: 100%;
    text-align: left;
    box-sizing: border-box;
    padding-left: 1em;
}

@media (max-width: 760px) {
    .register-page__form-title {
    text-align: center;
    padding-left: 0;
}
}

@media (max-width: 540px) {
    .register-page {
    width: 24em;
}
}

</style>
