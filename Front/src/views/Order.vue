<template>
    <div class="order">
        <div class="order-title">
            <i class="fas fa-clipboard-list"></i>
            <span>Zamówienia</span>
        </div>
        <div class="order-content">
            <div class="empty-orders" v-if="orderList.length == 0">
                <span>Nie masz złożonych żadnych zamówień</span>
            </div>
            <div class="order-info" v-else>
                <div class="one-order" v-for="item in orderList" :key="item.id">
                    <Orderitem v-bind="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Orderitem from '../components/Orderitem.vue'
import Service from '../Service/Service.js'

export default {
    name: 'Order',
    data() {
        return {
            orderList: [  ],
            openedInfo: false,
            page: 1
        }
    },
    components: {
        Orderitem
    },
    async created() {
        const temp = await Service.getOrders(this.$store.getters['user/getEmail']);
        Array.prototype.push.apply(this.orderList, temp.data);
        for (const item in this.orderList) {
            if (this.orderList[item].Address_fk === null) {
                this.orderList[item].Address_fk = 0;
            }
        }
        this.orderList.reverse();
    },
    methods: {
        
    }
    
}
</script>

<style scoped>
.order {
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
.one-order {
    box-sizing: border-box;
    width: 100%;
    margin: 0.5em 0;
}

</style>