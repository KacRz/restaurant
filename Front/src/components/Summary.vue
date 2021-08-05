<template>
    <div class="summary">
        <div class="totalprice">
            <h2>Suma: {{ totalPrice.toFixed(2) }}zł</h2>
        </div>
        <div class="summary-delivery">
            <h3>Wybierz dostawę</h3>
            <div class="delivery-option" v-on:click="pickDelivery(0)" :class="{chosenOption: isHomeDelivery}">
                <i class="fas fa-shipping-fast icon"></i>Dostawa do domu
            </div>
            <div class="delivery-option" v-on:click="pickDelivery(1)" :class="{chosenOption: isLocalDelivery}">
                <i class="fas fa-walking icon"></i>Odbiór w lokalu
            </div>
        </div>
        <div class="summary-form">
            <div class="address-form__logged" v-if="isHomeDelivery && logged">
                <h3>Podaj dane zamówienia</h3>
                <div class="one-address" v-for="(address, index) in addresslist" :key="index" :class="{chosenAddress: pickedAddressList[index]}" v-on:click="toggleAddress(index)">
                    <span>
                        {{ address.City }}
                    </span>
                    <span>
                        {{ address.Street }} {{ address.HouseNumber }}
                    </span>
                    <span>
                        {{ address.PostalCode }}
                    </span>
                    <div v-if="pickedAddressList[index]">
                        <i class="fas fa-map-marked-alt address-icon"></i>
                    </div>
                    <div v-else>
                        <i class="fas fa-map address-icon"></i>
                    </div>
                    
                </div>
            </div>
            <form class="address-form__guest" @submit.prevent = "submit" method="post" v-if="!logged">
                <h3>Podaj dane zamówienia</h3>
                <div class="guest_field">
                    <span>Email</span><input type="email" v-model="email" placeholder="Email" required/>
                </div>
                <div class="guest_field">
                    <span>Miasto</span><input type="text" v-model="city" placeholder="Miasto" required/>
                </div>
                <div class="guest_field">
                    <span>Ulica</span><input type="text" v-model="street" placeholder="Ulica" required/>
                </div>
                <div class="guest_field">
                    <span>Nr domu/mieszkania</span><input type="text" v-model="housenumber" placeholder="Nr domu/mieszkania" required/>
                </div>
                <div class="guest_field">
                    <span>Kod pocztowy</span><input type="text" v-model="postalcode" placeholder="Kod pocztowy (xx-xxx)" maxlength="6" required/>
                </div>
            </form>
        </div>
        <div class="summary-payment">
            <h3>Wybierz płatność</h3>
            <div class="payment-option" v-on:click="pickPayment(0)" :class="{chosenOption: isCartPayment}">
                <i class="far fa-credit-card icon"></i>Płatność kartą przy odbiorze
            </div>
            <div class="payment-option" v-on:click="pickPayment(1)" :class="{chosenOption: isMoneyPayment}">
                <i class="fas fa-money-bill-wave icon"></i>Płatność gotówką przy odbiorze
            </div>
        </div>
        <div class="summary-total">
            <div class="summary-btn" v-on:click="submit">
                Dalej<i class="fas fa-arrow-alt-circle-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import Service from '../Service/Service'

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
            selectedAddress: 0,
            addresslist: [  ],
            pickedAddressList: [  ],

            deliveryOptions: [ "homeDelivery", "localDelivery" ],
            isHomeDelivery: true,
            isLocalDelivery: false,
            chosenDelivery: 0,

            paymentOptions: [ "cardPayment", "moneyPayment" ],
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
        },
        pickPayment(payment) {
            this.chosenPayment = payment;
            if (payment == 0) { this.isCartPayment = true; this.isMoneyPayment = false }
            if (payment == 1) { this.isMoneyPayment = true; this.isCartPayment = false }
        },
        async submit() {
            if (this.logged === true) {
                // Obsługa zamówienia dla zalogowanego
                const data = {
                    address: this.addresslist[this.selectedAddress] || null,
                    delivery: this.deliveryOptions[this.chosenDelivery],
                    payment: this.paymentOptions[this.chosenPayment],
                    cart: this.$store.state.cart.cartItems,
                    email: this.$store.getters['user/getEmail'],
                    date: new Date(),
                    totalprice: this.totalPrice,
                    status: "Złożono zamówienie"
                }
                if (data.delivery == "localDelivery") {
                    data.address = false;
                }

                await Service.createNewOrder(data);
                this.$store.dispatch("cart/cleanCart");
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Złożono zamówienie</h3></center>',
                    position: 'center',
                    background: '#1b1b1b',
                    icon: 'success',
                    confirmButtonColor: 'green'
                });
            }
            else {
                // Obsługa zamówienia dla niezalogowanego
                if (this.totalPrice >= 100.00) {
                    this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Musisz się zalogować, aby złożyć zamówienie za więcej niż 100zł</h3></center>',
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '20rem',
                    icon: 'error'
                });
                    return false;
                }
                if (this.email === '' || this.city === '' || this.street === '' || this.housenumber === '' || this.postalcode === '' ) {
                    this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Podaj wymagane dane do kontaktu</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '20rem',
                    icon: 'error'
                });
                    return false;
                }
                if (this.postalcode) {
                    if (!this.validPostalcode(this.postalcode)){
                        this.$swal({
                            html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Podaj prawidłowy kod-pocztowy</h3></center>',
                            timer: 1500,
                            timerProgressBar: true,
                            toast: true,
                            position: 'top-end',
                            background: '#1b1b1b',
                            showConfirmButton: false,
                            width: '20rem',
                            icon: 'error'
                        });
                        return false;
                }
                if (this.email) {
                    if (!this.validEmail(this.email)){
                        this.$swal({
                            html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Podaj prawidłowy email</h3></center>',
                            timer: 1500,
                            timerProgressBar: true,
                            toast: true,
                            position: 'top-end',
                            background: '#1b1b1b',
                            showConfirmButton: false,
                            width: '20rem',
                            icon: 'error'
                        });
                        return false;
                }
            }   
                const data = {
                    email: this.email,
                    city: this.city,
                    street: this.street,
                    housenumber: this.housenumber,
                    postalcode: this.postalcode,
                    delivery: this.deliveryOptions[this.chosenDelivery],
                    payment: this.paymentOptions[this.chosenPayment],
                    cart: this.$store.state.cart.cartItems,
                    date: new Date(),
                    totalprice: this.totalPrice,
                    status: "Złożono zamówienie"
                }
                await Service.createNewOrderForGuest(data);
                this.$store.dispatch("cart/cleanCart");
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Złożono zamówienie</h3></center>',
                    position: 'center',
                    background: '#1b1b1b',
                    icon: 'success',
                    confirmButtonColor: 'green'
                });
            }
            }          
        },
        toggleAddress(index) {
            this.selectedAddress = index;
            for (let i = 0; i < this.addresslist.length; i++) {
                this.pickedAddressList[i] = false;
            }
            this.pickedAddressList[index] = true;
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
        this.pickedAddressList[0] = true;
        for (let i = 1; i < this.addresslist.length; i++) {
            this.pickedAddressList[i] = false;
        }
    }
}
</script>

<style scoped>
.summary {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
}
.totalprice {
    position: absolute;
    top: -10px;
    right: 10px;
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
    background-color: #2b2b2b;
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
    margin-left: auto;
    margin-right: 1em;
    margin-bottom: 0.5em;

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
    width: 100%;
    height: auto;
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
.one-address:hover {
    cursor: pointer;
}
.address-icon {
    position: absolute;
    right: 10%;
    top: 30%;
    font-size: 1.7em;
}
.one-address > span {
    width: 100%;
    height: auto;
    text-align: left;
    word-wrap: break-word;
}
.chosenAddress {
    border: 3px solid rgb(255, 205, 124);
    font-size: 1.4em;
    background-color: #2b2b2b;
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
    .address-icon {
    right: 5%;
    top: 65%;
    font-size: 1em;
    }
}
@media (max-width: 450px) {
    .summary {
        padding-top: 2em;
    }
}

</style>