<template>
    <div class="order">
        <div class="order-title">
            <i class="fas fa-clipboard-list"></i>
            <span>Zamówienia</span>
            <div class="status-info" 
                v-on:mouseover="showStatusInfo = true" 
                v-on:mouseleave="showStatusInfo = false">
                <i class="fas fa-question-circle"></i>
            </div>
            <div class="information" v-if="showStatusInfo">
                <h3>Statusy zamówienia</h3>
                <div class="one-status">
                    <div>
                        <i class="fas fa-lightbulb icon" style="color: orange"></i> 
                        <span class="status-title">Złożono zamówienie</span>
                    </div>
                    <span> Twoje zamówienie zostało złożone i czeka na akceptację</span>
                </div>
                <div class="one-status">
                    <div>
                        <i class="fas fa-lightbulb icon" style="color: yellow"></i> 
                        <span class="status-title">Przyjęto do realizacji</span>
                    </div>
                    <span>Twoje zamówienie jest przygotowywane</span>
                </div>
                <div class="one-status">
                    <div>
                        <i class="fas fa-lightbulb icon" style="color: green"></i> 
                        <span class="status-title">Gotowe</span>
                    </div>
                    <span>Twoje zamówienie jest w drodze do Ciebie lub możesz odebrać swoje zamówienie w lokalu</span>
                </div>
            </div>
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
            showStatusInfo: false
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
.information {
    position: absolute;
    width: 200px;
    height: 300px;
    background-color: #2b2b2b;
    top: 180px;
    right: 0;
    left: 0;
    margin: 0 auto;
    z-index: 10;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgb(255, 205, 124);
}
.one-status {
    margin: 0.5em 0.3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.status-title {
    font-weight: bold;
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
    padding-right: 0.5em;
}
.icon {
    margin-right: 0.3em;
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
.status-info {
    transition: 0.5s;
}
.status-info:hover {
    color: lightblue;
    cursor: pointer;
}

</style>