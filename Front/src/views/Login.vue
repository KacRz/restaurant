<template>
    <div class="login-page" >

        <form 
            class="login-page__form" 
            @submit.prevent = "checkForm" 
            method="post"
        >

            <div class="login-page__title">
                <h3>Posiadasz konto? Zaloguj się</h3>
            </div>

            <div class="login-page__error" v-if="errors.length">
                    <div class="login-page__error-item" v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </div>
            </div>

            <div class="login-page__form-group">
                <label for="email">Email*</label>
                <input type="email" v-model="email" id="email" class="login-page__input" placeholder="Email" required/>
            </div>
            <div class="login-page__form-group">
                <label for="password">Hasło*</label>
                <input type="password" v-model="password" id="password" class="login-page__input" placeholder="Hasło" required/>
            </div>
            <button type="submit" class="login-page__button">Zaloguj</button>
        </form>
          
        <div class="login-page__register-group">
            <h3>Nie masz konta?</h3>
            <router-link to="/register" class="login-page__register-group-link">Zarejestruj się</router-link>
            <router-link to="/remindpassword" class="login-page__register-group-link">Zapomniałeś hasła?</router-link>
        </div>

    </div>
</template>

<script>
import '../Service/Service'
import Service from '../Service/Service';
export default {
    name: 'Login',
    data() {
        return {
            errors: [],
            email: '',
            password: ''
        }
    },
    methods: {
        checkForm() {
            if (this.email && this.password) {
                this.handleSubmit();
                return true;
            }
            this.errors = [];

            if (!this.email) {
                this.errors.push('Podaj email');
            }
            if (!this.password) {
                this.errors.push('Podaj hasło');
            }

        },

        async handleSubmit() {
            console.log(await Service.login(this.email, this.password));
        }
    },
    setup() {
        
    },
}
</script>

<style scoped>
.login-page {
    background: rgb(165,42,42);
    background: linear-gradient(146deg, rgba(165,42,42,1) 0%, rgba(140,49,49,1) 75%, rgba(165,42,42,1) 100%);
    width: 40em;
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;

    color: rgb(0, 0, 0);

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 10px;
    font-size: 1.1em;
}

.login-page__form {
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

.login-page__title {
    background-color: rgb(119, 45, 45);
    width: 100%;
    color: rgb(0, 0, 0);
}

.login-page__form-group {
    margin-top: 1em;
    padding: 0 0.5em;
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-page__input {
    font-size: 1em;
    width: 80%;

    padding: 0.3em;

    border: none;
}

.login-page__button {
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

.login-page__button:hover {
    width: 75%;
    cursor: pointer;
}

.login-page__button:active {
    background-color: rgb(46, 38, 37);;
}

.login-page__register-group {
    width: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: center;
}

.login-page__register-group-link {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 0.6em;

    text-decoration: none;
}

.login-page__error {
    width: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-page__error-item {
    background-color: red;
    
    width: 60%;
    padding: 0.3em;
    margin: 0.1em;
    border-radius: 5px;
    border: 1px solid black;

    font-weight: bold;
}

@media (max-width: 750px) {
    .login-page {
    width: 22em;
    }
    
    .login-page__register-group {
        font-size: 0.6em;
    }
}
</style>
