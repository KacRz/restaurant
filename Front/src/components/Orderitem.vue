<template>
    <div class="orderitem">
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
            <i class="fas fa-lightbulb icon" :class="{ orderCreated: orderCreated, orderPending: orderPending, orderReady: orderReady }" ></i>
            {{ Status }}
            <div class="more-info" v-on:click="showMoreInfo">
                <i class="fas fa-info-circle"></i>
            </div>
        </div>
        <div v-if="showDetails" :class="{slideAnimation: showDetails}">
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
</template>

<script>
import Service from '../Service/Service.js'

export default {
    name: "Orderitem",
    data() {
        return {
            showDetails: false,
            orderDetailsList: [  ],
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
    },
    methods: {
        showMoreInfo() {
            this.showDetails = !this.showDetails;
        }
    },
    computed: {
        CorrectDate() {
            let correct = this.OrderDate;
            correct = correct.replace('T', ' ');
            correct = correct.replace('.000Z', '');
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
            if (this.Status == 'Złożono zamówienie') { 
                return true; 
            }
            return false;
        },
        orderPending() {
            if (this.Status == 'Przyjęto do realizacji') { 
                return true; 
            }
            return false;
        },
        orderReady() {
            if (this.Status == 'Gotowe') { 
                return true; 
            }
            return false;
        }
    },

    async created() {
        const temp = await Service.getOrderList(this.id);
        Array.prototype.push.apply(this.orderDetailsList, temp.data);
        console.log(this.Status);
    }
}
</script>

<style scoped>
.orderitem {
    width: 100%;
    border: 1px solid rgb(255, 205, 124);
    display: flex;
    flex-wrap: wrap;
    padding: 1em 0.5em;
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
    transition: 1s;
}
.slideAnimation {
    background-color: #1b1b1b;
    border-top: none;
    width: 100%;
    text-align: left;
    padding-bottom: 0.5em;
}
.details {
    width: 100%;
    box-sizing: border-box;
    padding: 1em 0 1em 1em;
    display: flex;
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
.order-info {
    margin: 0 1em;
    text-align: left;
}
.info {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
}
.order-status {
    margin: 0 1em;
    text-align: left;
    font-size: 1.1em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.more-info {
    margin-left: 1em;
    font-size: 1.5em;
    transition: 0.5s;
}
.more-info:hover {
    cursor: pointer;
    color: lightblue;
}

@media (max-width: 1100px) {
    .orderitem {
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