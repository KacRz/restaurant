<template>
    <div class="orderstaffitem">
        <div class="wrapper">
            <div class="info">
                <div class="order-info">
                    {{ CorrectDate }}
                </div>
                <div class="order-info">
                    <i class="fas fa-truck icon"></i>
                    {{ CorrectDelivery }}
                </div>
                <div class="order-info">
                    <i class="fas fa-wallet icon"></i>
                    {{ CorrectPayment }}
                </div>
            </div>
            <div class="order-status">
                <i class="fas fa-lightbulb icon"></i>
                {{ CorrectStatus }}
                <button class="btn" v-on:click="changeStatus">Zmień status</button>
                <button class="btn-del" v-on:click="deleteOrder">Anuluj</button>
            </div>
        </div>
        <div class="details">
            <div class="slideAnimation">
            <div v-for="info in orderDetailsList" :key="info.id" class="details">
                <div class="one-detail foodname">
                    <i class="fas fa-pizza-slice icon-detail"></i>Nazwa: {{ info.Fooditem.Title }}
                </div>
                <div class="one-detail">
                    Ilość: {{ info.Quantity }}
                </div>
                <div class="one-detail">
                    <i class="fas fa-tag icon-detail"></i>Cena: {{ info.StablePrice }}zł
                </div>
            </div>
            <div class="total">
                <span class="icon-detail">Suma: {{ TotalSum }}zł</span>
            </div>
        </div>
        </div>
        <div class="user-details">
            <span class="user-detail"><i class="fas fa-user icon"></i>Email: <span class="bold">{{ Email }}</span></span>
            <span class="user-detail" v-if="userInfo">Imię: <span class="bold">{{ userInfo.firstname }}</span></span>
            <span class="user-detail" v-else>Konto niezarejestrowane </span>
            <span class="user-detail" v-if="userInfo">Nazwisko: <span class="bold">{{ userInfo.lastname }}</span></span>
        </div>
        <div class="address" v-if="Address">
            <span >Adres:</span>
            <span class="bold">{{ Address.City }}</span>
            <span class="bold">{{ Address.Street }} {{ Address.HouseNumber }}</span>
            <span class="bold">{{ Address.PostalCode }}</span>
        </div>
        <div class="address" v-else>
            <span>Odbiór osobisty</span>
        </div>
    </div>
</template>

<script>
import Service from '../Service/Service.js'

export default {
    name: "Orderstaffitem",
    data() {
        return {
            orderDetailsList: [  ],
            userInfo: {  },
            CorrectStatus: ' ',
        }
    },
    props: {
        id: { type: Number, required: true },
        OrderDate: { type: String, required: true },
        Delivery: { type: String, required: true },
        Payment: { type: String, required: true },
        Email: { type: String, required: true },
        Address_fk: { type: Number, required: true },
        Status: { type: String, required: true },
        TotalSum: { type: String, required: true },
        Address: { type: Object, required: false },
    },
    methods: {
        async deleteOrder() {
            if (this.CorrectStatus == "Anulowano") {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Nie można zmienić stanu tego zamówienia</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
                return false;
            }
            else {
                this.$swal({
                        html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Czy napewno chcesz anulować to zamówienie?</h3></center>',
                        position: 'center',
                        background: '#1b1b1b',
                        showCancelButton: true,
                        width: '32rem',
                        icon: 'warning',
                        confirmButtonText: 'Tak',
                        cancelButtonText: 'Nie',
                        confirmButtonColor: 'green',
                        cancelButtonColor: 'red'
                    }).then((async result => {
                        if (result.isConfirmed) {
                            const temp = await Service.deleteOrder(this.id);
                            this.CorrectStatus = temp.data.status;
                            this.$swal({
                                html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Anulowano zamówienie</h3></center>',
                                timer: 1500,
                                timerProgressBar: true,
                                toast: true,
                                position: 'top-end',
                                background: '#1b1b1b',
                                showConfirmButton: false,
                                width: '16rem',
                                icon: 'success'
                            });
                        }
                    }))
                }
        },
        async changeStatus() {
            if (this.CorrectStatus == "Gotowe") {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Nie można zmienić stanu tego zamówienia</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
                return false;
            }
            else if (this.CorrectStatus == "Anulowano") {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Nie można zmienić stanu tego zamówienia</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
                return false;
            }
            else {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Czy napewno chcesz zmienić status tego zamówienia?</h3></center>',
                    position: 'center',
                    background: '#1b1b1b',
                    showCancelButton: true,
                    width: '32rem',
                    icon: 'warning',
                    confirmButtonText: 'Tak',
                    cancelButtonText: 'Nie',
                    confirmButtonColor: 'green',
                    cancelButtonColor: 'red'
                }).then((async result => {
                    if (result.isConfirmed) {
                        const temp = await Service.changeStatus(this.id);
                        this.CorrectStatus = temp.data.status;
                        this.$swal({
                            html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Zmieniono status zamówienia</h3></center>',
                            timer: 1500,
                            timerProgressBar: true,
                            toast: true,
                            position: 'top-end',
                            background: '#1b1b1b',
                            showConfirmButton: false,
                            width: '16rem',
                            icon: 'success'
                        });
                    }
                }))
                
            }
        }
    },
    computed: {
        CorrectDate() {
            let correct = this.OrderDate;
            correct = correct.replace('GMT+0200 (czas środkowoeuropejski letni)', ' ');
            correct = correct.substr(4, 24);
            correct = correct.replace('Jan', 'Styczeń');
            correct = correct.replace('Feb', 'Luty');
            correct = correct.replace('Mar', 'Marzec');
            correct = correct.replace('Apr', 'Kwiecień ');
            correct = correct.replace('May', 'Maj ');
            correct = correct.replace('Jun', 'Czerwiec');
            correct = correct.replace('Jul', 'Lipiec');
            correct = correct.replace('Aug', 'Sierpień');
            correct = correct.replace('Sep', 'Wrzesień');
            correct = correct.replace('Oct', 'Październik');
            correct = correct.replace('Nov', 'Listopad');
            correct = correct.replace('Dec', 'Grudzień');
            return correct;
        },
        CorrectPayment() {
            let temp = "";
            if (this.Payment == "cardPayment") {
                temp = "Płatność kartą";
            }
            else if (this.Payment == "moneyPayment") {
                temp = "Płatność gotówką";
            }
            return temp;
        },
        CorrectDelivery() {
            let temp = "";
            if (this.Delivery == "localDelivery") {
                temp = "Odbiór osobisty";
            }
            else if (this.Delivery == "homeDelivery") {
                temp = "Dostawa do domu";
            }
            return temp;
        },
        orderCreated() {
            if (this.CorrectStatus == 'Złożono zamówienie') { 
                return true; 
            }
            return false;
        },
        orderPending() {
            if (this.CorrectStatus == 'Przyjęto do realizacji') { 
                return true; 
            }
            return false;
        },
        orderReady() {
            if (this.CorrectStatus == 'Gotowe') { 
                return true; 
            }
            return false;
        }
    },
    async created() {
        const temp = await Service.getOrderList(this.id);
        Array.prototype.push.apply(this.orderDetailsList, temp.data);
        const temp2 = await Service.getUserData(this.$store.getters['user/getToken'], this.Email);
        this.userInfo = temp2.data;
        this.CorrectStatus = this.Status;
    }
}
</script>

<style scoped>
.orderstaffitem {
    width: 100%;
    border: 1px solid rgb(255, 205, 124);
    display: flex;
    flex-wrap: wrap;
    padding: 1em 0.5em;
    margin-bottom: 1em;
    justify-content: space-between;
    box-sizing: border-box;
    flex-direction: column;
}
.btn {
    background-color: green;
    border: none;
    padding: 0.4em;
    margin-left: 0.3em;
    border-radius: 5px;
    color: white;
    transition: 0.5s;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn:hover {
    cursor: pointer;
    background-color: lightgreen;
    color: black;
}
.btn-del {
    background-color: red;
    border: none;
    padding: 0.4em;
    margin-left: 0.3em;
    border-radius: 5px;
    color: white;
    transition: 0.5s;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn-del:hover {
    cursor: pointer;
    background-color: rgb(226, 55, 55);
    color: black;
}
.user-details {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.user-detail {
    margin-left: 1em;
}
.bold {
    font-weight: bold;
}
.address {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 0.5em 0 0 0.5em;
}
.address > span {
    margin-left: 0.5em;
}
.slideAnimation {
    background-color: #1b1b1b;
    border-top: none;
    width: 100%;
    text-align: left;
}
.info {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
}
.icon {
    margin-right: 0.3em;
}
.order-info {
    margin: 0 1em;
    text-align: left;
}
.order-status {
    margin: 0 1em;
    text-align: left;
    font-size: 1.1em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.details {
    width: 100%;
    box-sizing: border-box;
    padding: 1em 0 1em 1em;
    display: flex;
    text-align: left;
}
.foodname {
    width: 27%;
}
.one-detail {
    margin: 0 0.5em;
}
.icon {
    margin-right: 0.3em;
}
.icon-detail {
    margin-right: 0.6em;
}
.total {
    width: 100%;
    text-align: right;
}
.orderCreated {
    color: orange;
}
.orderPending {
    color: yellow;
}
.orderReady {
    color: green;
}

@media (max-width: 1100px) {
    .orderstaffitem {
        flex-direction: column;
        font-size: 0.8em;
    }
    .order-status {
        margin: 2em auto 0 auto; 
        font-size: 1.2em;
    }
    .one-detail {
        width: 33%;
    }
}

</style>