<template>
    <div class="order">
        <div class="order-title">
            <i class="fas fa-clipboard-list"></i>
            <span>Zamówienia</span>
        </div>
        <div class="order-content">
            <div class="empty-orders" v-if="orderList.length == 0">
                
            </div>
            <div class="order-info" v-else>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Order',
    data() {
        return {
            orderList: [/*
                {
                    id: 1,
                    Date: '26-07-2021',
                    Delivery: 'homeDelivery',
                    Payment: 'cardPayment',
                    Email: 'kretek@gmail.com',
                    Address_fk: 10
                },
                {
                    id: 2,
                    Date: '27-07-2021',
                    Delivery: 'localDelivery',
                    Payment: 'moneyPayment',
                    Email: 'kretek@gmail.com',
                    Address_fk: null
                },
                {
                    id: 3,
                    Date: '28-07-2021',
                    Delivery: 'homeDelivery',
                    Payment: 'cardPayment',
                    Email: 'kretek@gmail.com',
                    Address_fk: 10
                }*/
            ]
        }
    }
    
}
</script>

<style scoped>
.order {
    width: 100%;
    background-color: #1b1b1b;
    color: rgb(255, 205, 124);
}
.order-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0.3em;
    font-size: 2em;
    
    border-bottom: 1px solid rgb(255, 205, 124);
}
.order-title > span {
    padding-left: 0.3em;
}
.order-content {
    display: flex;
    flex-direction: column;
    margin-top: 2em;
}
</style>