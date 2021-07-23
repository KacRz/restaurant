<template>
    <div class="summary">
        <div class="summary-form">
            <h3>Podaj dane zamówienia</h3>
            <div class="address-form__logged" v-if="logged">
                <div class="one-address" v-for="(address, index) in addresslist" :key="index">
                    <input name="addresRadio" type="radio" value="{{ index }}" class="selected" v-on:click="toggleAddress(index)"/>
                    <span>
                        {{ address.city }}
                    </span>
                    <span>
                        {{ address.street }} {{ address.housenumber }}
                    </span>
                    <span>
                        {{ address.postalcode }}
                    </span>
                </div>
            </div>
            <div class="address-form__guest" v-else>
                <div class="guest_field">
                    <span>Email</span><input type="email" v-model="email" placeholder="Email"/>
                </div>
                <div class="guest_field">
                    <span>Miasto</span><input type="text" v-model="city" placeholder="Miasto"/>
                </div>
                <div class="guest_field">
                    <span>Ulica</span><input type="text" v-model="street" placeholder="Ulica"/>
                </div>
                <div class="guest_field">
                    <span>Nr domu/mieszkania</span><input type="text" v-model="housenumber" placeholder="Nr domu/mieszkania"/>
                </div>
                <div class="guest_field">
                    <span>Kod pocztowy</span><input type="text" v-model="postalcode" placeholder="Kod pocztowy (xx-xxx)"/>
                </div>
            </div>
        </div>
        <div class="summary-total">
            <h2>Suma: {{ totalPrice.toFixed(2) }}zł</h2>
            <div class="summary-btn" v-on:click="submit">
                Dalej<i class="fas fa-arrow-alt-circle-right"></i>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: "Summary",
    props: [
        "totalPrice"
    ],
    data() {
        return {
            email: '',
            city: '',
            street: '',
            housenumber: '',
            postalcode: '',
            selectedAddress: '',
            addresslist: [
                { city: 'Rzeszów', street: 'Dąbrowskiego', housenumber: '100', postalcode: '35-210' },
                { city: 'Kraków', street: 'Dmowskiego', housenumber: '64/128', postalcode: '31-215' }
            ]
        }
    },
    methods: {
        submit() {
            if (this.logged === true) {
                if (this.selectedAddress === ''){
                alert("Podaj wymagane dane");
                return false;
                }
                // Obsługa zamówienia dla zalogowanego
                console.log(this.addresslist[this.selectedAddress]);
                alert("Zamówienie przyjęto");
            }
            else {
                if (this.email === '' || this.city === '' || this.street === '' || this.housenumber === '' || this.postalcode === '') {
                    alert("Podaj wymagane dane do kontaktu");
                    return false;
                }
                if (this.postalcode) {
                    if (!this.validPostalcode(this.postalcode)){
                        alert("Podaj prawidłowy kod-pocztowy");
                        return false;
                }
                if (this.email) {
                    if (!this.validEmail(this.email)){
                        alert("Podaj prawidłowy email");
                        return false;
                }
            }   
                // Obsługa zamówienia dla niezalogowanego
                console.log(this.email);
                alert("Zamówienie przyjęto");
            }
            }
            
            
            },
        toggleAddress(index) {
            this.selectedAddress = index;
        },
        validPostalcode(postalcode) {
            let re = /^(([0-9]{2}-[0-9]{3}))$/;
            return re.test(postalcode);
        },
        validEmail(email) {
            let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return re.test(email);
        },
    },
    computed: {
        logged() {
            //return this.$store.state.user.isLogged;
            return true;
        },
    }
}
</script>

<style scoped>
.summary {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.summary-total {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-right: 1em;
}
.summary-total > h2 {
    display: block;
    margin-right: auto;
    padding-left: 1em;
}
.summary-btn {
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    border-radius: 10px;
    font-size: 1.2em;
    margin-right: 1em;

    transition: padding 0.3s, background-color 0.3s;
}
.summary-btn:hover {
    background-color: rgb(50, 187, 50);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}
.fa-arrow-alt-circle-right {
    margin-left: 0.3em;
}
.summary-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.address-form__guest {
    width: 40%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.guest_field {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    margin-bottom: 0.1em;
}
.guest_field > span {
    width: 40%;
    text-align: left;
}
.guest_field > input {
    width: 40%;
    font-size: 1.1em;
}
.address-form__logged {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.one-address {
    width: 50%;
    border: 1px solid rgb(255, 205, 124);
    font-size: 1.3em;
    margin-bottom: 0.5em;
    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    flex-direction: column;
    position: relative;
}
.one-address > span {
    width: 100%;
    height: auto;
    text-align: left;
    word-wrap: break-word;
}
.selected {
    position: absolute;
    right: 10%;
    top: 25%;
    width: 50px;
    height: 50px;
    color: #1b1b1b;
}

@media (max-width: 1000px) {
    .guest_field {
        flex-direction: column;
    }
    .address-form__guest {
        width: 80%;
    }
    .guest_field > input {
        width: 100%;
    }
    .guest_field > span {
        width: 100%;
    }
    .one-address {
    font-size: 1.5em;
    flex-direction: column;
    }
    .selected {
    right: 5%;
    top: 65%;
    width: 25px;
    height: 25px;
    }
}

</style>