<template>
    <div class="orderstaff">
        <div class="order-title">
            <i class="fas fa-clipboard-list"></i>
            <span>Zamówienia</span>
        </div>
        <div class="order-content">
            <div class="today-order">
                <div class="one-order" v-for="item in orderList" :key="item.id">
                    <Orderstaffitem v-bind="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Orderstaffitem from '../components/Orderstaffitem.vue'
import StaffService from '../Service/StaffService.js'

export default {
    name: "Orderstaff",
    data() {
        return {
            orderList: [ ],
        }
    },
    components: {
        Orderstaffitem
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
        
    },
    async created() {
        const temp = await StaffService.getTodaysOrders();
        Array.prototype.push.apply(this.orderList, temp.data);
        for (const item in this.orderList) {
            if (this.orderList[item].Address_fk === null) {
                this.orderList[item].Address_fk = 0;
            }
        }
        this.orderList.reverse();
        //console.log(this.orderList);
    }
}
</script>

<style scoped>
.orderstaff {
    width: 100%;
    background-color: #1b1b1b;
    color: rgb(255, 205, 124);
    padding: 0 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.order-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.3em;
    font-size: 2em;
    
    border-bottom: 2px solid rgb(255, 205, 124);
}
.order-title > span {
    padding-left: 0.3em;
}
.order-content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 2em;
    padding-bottom: 2em;
    width: 80%;
}

</style>