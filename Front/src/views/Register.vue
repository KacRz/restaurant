<template>
    <div class="register-page">

        <form 
            class="register-page__form" 
            @submit.prevent="checkForm"
            method="post">

            <div class="register-page__title">
                <!--<router-link to="/login" style="register-page__title-link">Zaloguj się</router-link>-->
                <h3>Nie masz konta? Załóż je!</h3>
            </div>

            <div class="register-page__error" v-if="errors.length">
                    <div class="register-page__error-item" v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </div>
            </div>

            <div class="register-page__form-title">
                <h4>1. Dane logowania</h4>
            </div>
            <div class="register-page__form-group">
                <label for="email">Email*</label>
                <input type="email" v-model="email" id="email" class="register-page__input" placeholder="Email" required/>
            </div>
            <div class="register-page__form-group">
                <label for="password">Hasło*</label>
                <input type="password" v-model="password" minlength="8" id="password" class="register-page__input" placeholder="Hasło" required/>
            </div>
            <div class="register-page__form-group">
                <label for="password2">Powtórz hasło*</label>
                <input type="password" v-model="password2" minlength="8" id="password2" class="register-page__input" placeholder="Powtórz hasło" required/>
            </div>
            <div class="register-page__form-title">
                <h4>2. Twoje dane</h4>
            </div>
            <div class="register-page__form-group">
                <label for="firstname">Imię*</label>
                <input type="text" v-model="firstname" id="firstname" class="register-page__input" placeholder="Imię" required/>
            </div>
            <div class="register-page__form-group">
                <label for="lastname">Nazwisko*</label>
                <input type="text" v-model="lastname" id="lastname" class="register-page__input" placeholder="Nazwisko" required/>
            </div>
            <div class="register-page__form-group">
                <label for="city">Miasto*</label>
                <input type="text" v-model="city" id="city" class="register-page__input" placeholder="Miasto" required/>
            </div>
            <div class="register-page__form-group">
                <label for="street">Ulica*</label>
                <input type="text" v-model="street" id="street" class="register-page__input" placeholder="Ulica" required/>
            </div>
            <div class="register-page__form-group">
                <label for="housenumber">Numer domu/mieszkania*</label>
                <input type="text" v-model="housenumber" id="housenumber" class="register-page__input" placeholder="Nr domu/mieszkania" required/>
            </div>
            <div class="register-page__form-group">
                <label for="postalcode">Kod pocztowy*</label>
                <input type="text" v-model="postalcode" maxlength="6" id="postalcode" class="register-page__input" placeholder="xx-xxx" required/>
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
            errors: [],
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
        checkForm() {
            this.errors = [];

            if (this.postalcode) {
                if (!this.validPostalcode(this.postalcode)){
                    this.errors.push('Podaj prawidłowy kod pocztowy (xx-xxx)');
                }
            }

            if (this.password !== this.password2){
                this.errors.push('Podane hasła nie są identyczne');
            }
            

            if (!this.email || !this.password || !this.password2 || !this.firstname || !this.lastname || !this.city || !this.street || !this.housenumber || !this.postalcode) {
                this.errors.push('Musisz wypełnić wszystkie pola');
            }

            if (this.email && this.password && this.password2 && this.firstname && this.lastname && this.city && this.street && this.housenumber && this.postalcode && !this.errors.length) {
                this.handleSubmit();
                return true;
            }
        },

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

        },

        validPostalcode(postalcode) {
            let re = /^(([0-9]{2}-[0-9]{3}))$/;
            return re.test(postalcode);
        },

    },
    setup() {
        
    },
}
</script>

<style scoped>
.register-page {
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
    background-color: #2d2d2d;
    width: 100%;
    color: rgb(255, 205, 124);

    display: flex;
    justify-content: center;
    align-items: center;
}

.register-page__title-link {
    background-color: red;
    font-size: 100px;
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

.register-page__button:hover {
    width: 75%;
    cursor: pointer;
}

.register-page__button:active {
    background-color: rgb(46, 38, 37);;
}

.register-page__form-title {
    width: 100%;
    text-align: left;
    box-sizing: border-box;
    padding-left: 1em;
}

.register-page__error {
    width: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.register-page__error-item {
    background-color: red;
    
    width: 60%;
    padding: 0.3em;
    margin: 0.1em;
    border-radius: 5px;
    border: 1px solid black;

    font-weight: bold;
}

@media (max-width: 750px) {
    .register-page__form-title {
    text-align: center;
    padding-left: 0;
    }

    .register-page {
    width: 22em;
    }

}

</style>
