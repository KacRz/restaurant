<template>
    <div class="menu">

        <div class="menu-category">
            <div class="menu-category__title">
                <h1>Pizze</h1>
            </div>
            <div class="menu-category__element" v-for="item in foodlist" :key="item.number">
                <Fooditem v-bind="item" v-on:click="onClickedItem(item.number)"/>
                
            </div>

            <AdditemToCart v-if="!isHidden" v-bind="foodlist[clickedItem]" @closeNow="closeWindow"/>
        </div>


    </div>
</template>

<script>
import Fooditem from '../components/Fooditem.vue'
import AdditemToCart from '../components/AddItemToCart.vue'

export default {
    name: "Menu",
    data() {
        return {
            isHidden: true,
            clickedItem: '',
            foodlist: [
                {
                    title: "Mexicana",
                    description: "Bardzo dobra pizza o niesamowitym smaku. Ciekawy wybór dla koneserów ostrej pizzy. Jedyna w swoim rodzaju.",
                    price: "29.00",
                    imgsource: "https://kuron.com.pl/wp-content/uploads/2019/03/P3251115.jpg.webp",
                    number: "1"
                },
                {
                    title: "Neapolitana",
                    description: "Pizza o bardzo wyrazistym smaku. Polecamy dla każdego fana zdrowego żywienia. Sos majonezowy dodatkowo podkreśla smak.",
                    price: "22.99",
                    imgsource: "https://fotokulinarnie.pl/wp-content/uploads/2021/02/IMG_4279-2-792x528.jpg?v=1612889508",
                    number: "2"
                },
                {
                    title: "Diabolica",
                    description: "Pizza bardzo bardzo ostra. Uwaga. Tylko dla fanów prawdziwego piekła.",
                    price: "31.00",
                    imgsource: "https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/pizza-grecka.jpg",
                    number: "3"
                },
                {
                    title: "Hawajska",
                    description: "Pizza tylko dla PRAWDZIWYCH koneserów. Ananas pokrojony w delikatne plasterki rozpływa się w ustach.",
                    price: "36.00",
                    imgsource: "https://st.depositphotos.com/1003814/5052/i/950/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg",
                    number: "4"
                },
                {
                    title: "Margharita",
                    description: "Podstawowa pizza. Bez żadnych dodatków, konserwantów. Czysty smak włoskiej pizzy.",
                    price: "20.00",
                    imgsource: "https://restaumatic-production.imgix.net/uploads/accounts/23308/media_library/26d6eb92-ef8e-4074-bd25-4b815272beda.jpg?auto=compress&blur=0&crop=focalpoint&fit=max&fp-x=0.5&fp-y=0.5&h=auto&rect=0%2C0%2C2000%2C1333&w=1920",
                    number: "5"
                },
                {
                    title: "Brokoli",
                    description: "Pizza z brokułami. Nic wielkiego.",
                    price: "24.00",
                    imgsource: "https://www.broilking.pl/files/blog/129/broil-king-pizza-z-grilla-d-b88c2458.jpg",
                    number: "6"
                },
            ]
        }
    },
    components: {
        Fooditem,
        AdditemToCart
    },
    setup() {

    },
    methods: {
        onClickedItem(id) {
            this.isHidden = !this.isHidden;
            this.clickedItem = --id;
        },
        closeWindow() {
            this.isHidden = true;
        }
    },
    created()
    {

    }
}
</script>

<style scoped>
.menu {
    display: flex;
    justify-content: center;
}

.menu-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;

    padding: 0.5em;
}
.menu-category__element {
    padding: 1em;
}
.menu-category__title {
    width: 100%;
    padding-left: 4em;

    background: rgb(165,42,42);
    background: linear-gradient(146deg, rgba(165,42,42,1) 0%, rgba(140,49,49,1) 75%, rgba(165,42,42,1) 100%);
    color: white;

    display: flex;
    justify-content: flex-start;
}

</style>