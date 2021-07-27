<template>
    <div class="summary">
        <div class="summary-delivery">
            <h3>Wybierz dostawę</h3>
            <div class="delivery-option" v-on:click="pickDelivery(0)" :class="{chosenOption: isHomeDelivery}">
                <i class="fas fa-shipping-fast icon"></i>Dostawa do domu
            </div>
            <div class="delivery-option" v-on:click="pickDelivery(1)" :class="{chosenOption: isLocalDelivery}">
                <i class="fas fa-walking icon"></i>Odbiór w lokalu
            </div>
        </div>
        <div class="summary-form" v-if="isHomeDelivery">
            <h3>Podaj dane zamówienia</h3>
            <div class="address-form__logged" v-if="logged">
                <div class="one-address" v-for="(address, index) in addresslist" :key="index">
                    <input name="addresRadio" type="radio" value="{{ index }}" class="selected" v-on:click="toggleAddress(index)"/>
                    <span>
                        {{ address.City }}
                    </span>
                    <span>
                        {{ address.Street }} {{ address.HouseNumber }}
                    </span>
                    <span>
                        {{ address.PostalCode }}
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
        <div class="summary-payment">
            <h3>Wybierz dostawę</h3>
            <div class="payment-option" v-on:click="pickPayment(0)" :class="{chosenOption: isCartPayment}">
                <i class="far fa-credit-card icon"></i>Płatność kartą przy odbiorze
            </div>
            <div class="payment-option" v-on:click="pickPayment(1)" :class="{chosenOption: isMoneyPayment}">
                <i class="fas fa-money-bill-wave icon"></i>Płatność gotówką przy odbiorze
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
            addresslist: [  ],

            deliveryOptions: [ "homeDelivery", "localDelivery" ],
            isHomeDelivery: true,
            isLocalDelivery: false,
            chosenDelivery: 0,

            paymentOptions: [ "cartPayment", "moneyPayment" ],
            isCartPayment: true,
            isMoneyPayment: false,
            chosenPayment: 0
        }
    },
    methods: {
        pickDelivery(delivery) {
            this.chosenDelivery = delivery;
            if (delivery == 0) { this.isHomeDelivery = true; this.isLocalDelivery = false}
            if (delivery == 1) { this.isLocalDelivery = true; this.isHomeDelivery = false }
            console.log(this.chosenDelivery);
        },
        pickPayment(payment) {
            this.chosenPayment = payment;
            if (payment == 0) { this.isCartPayment = true; this.isMoneyPayment = false }
            if (payment == 1) { this.isMoneyPayment = true; this.isCartPayment = false }
            console.log(this.chosenPayment);
        },
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
            return this.$store.state.user.isLogged;
        },
    },
    created() {
        this.addresslist = this.$store.getters['user/getAddresses'];
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
.summary-delivery {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.delivery-option {
    width: 40%;
    border: 1px solid rgb(255, 205, 124);
    padding: 1em;
    margin: 0.5em;
}
.delivery-option:hover {
    cursor: pointer;
}
.summary-payment {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.payment-option {
    width: 40%;
    border: 1px solid rgb(255, 205, 124);
    padding: 1em;
    margin: 0.5em;
}
.payment-option:hover {
    cursor: pointer;
}
.chosenOption {
    border: 3px solid rgb(255, 205, 124);
    font-size: 1.1em;
}
.icon {
    margin-right: 0.5em;
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