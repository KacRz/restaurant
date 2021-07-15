<template>
    <div class="menu">

        <div class="menu-category">
            <div class="menu-category__title">
                <h1>Pizze</h1>
            </div>
            <div class="menu-category__element" v-for="item in foodlist" :key="item.number">
                <Fooditem v-bind="item" />
            </div>
            <div class="menu-category__element" v-for="item in foodlist" :key="item.number">
                <Fooditem v-bind="item" />
            </div>
            <div class="menu-category__element" v-for="item in foodlist" :key="item.number">
                <Fooditem v-bind="item" />
            </div>
        </div>
    </div>
</template>

<script>
import Fooditem from '../components/Fooditem.vue'

export default {
    name: "Menu",
    data() {
        return {
            foodlist: [
                {
                    title: "Mexicana",
                    description: "Bardzo dobra pizza o niesamowitym smaku. Ciekawy wybór dla koneserów ostrej pizzy. Jedyna w swoim rodzaju.",
                    price: "29.00",
                    imgsource: "https://kuron.com.pl/wp-content/uploads/2019/03/P3251115.jpg.webp",
                    number: "01"
                },
                {
                    title: "Neapolitana",
                    description: "Pizza o bardzo wyrazistym smaku. Polecamy dla każdego fana zdrowego żywienia. Sos majonezowy dodatkowo podkreśla smak.",
                    price: "22.99",
                    imgsource: "https://fotokulinarnie.pl/wp-content/uploads/2021/02/IMG_4279-2-792x528.jpg?v=1612889508",
                    number: "02"
                },
                {
                    title: "Diabolica",
                    description: "Pizza bardzo bardzo ostra. Uwaga. Tylko dla fanów prawdziwego piekła.",
                    price: "31.00",
                    imgsource: "https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/pizza-grecka.jpg",
                    number: "03"
                },
                {
                    title: "Hawajska",
                    description: "Pizza bardzo bardzo ostra. Uwaga. Tylko dla fanów prawdziwego piekła.",
                    price: "36.00",
                    imgsource: "https://st.depositphotos.com/1003814/5052/i/950/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg",
                    number: "04"
                },
                {
                    title: "Margharita",
                    description: "Pizza bardzo bardzo ostra. Uwaga. Tylko dla fanów prawdziwego piekła.",
                    price: "20.00",
                    imgsource: "https://restaumatic-production.imgix.net/uploads/accounts/23308/media_library/26d6eb92-ef8e-4074-bd25-4b815272beda.jpg?auto=compress&blur=0&crop=focalpoint&fit=max&fp-x=0.5&fp-y=0.5&h=auto&rect=0%2C0%2C2000%2C1333&w=1920",
                    number: "05"
                },
            ]
        }
    },
    components: {
        Fooditem
    },
    setup() {

    }
}
</script>

<style scoped>
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