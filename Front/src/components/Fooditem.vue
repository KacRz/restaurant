<template>
  <div class="fooditem">
      <div class="fooditem-top">
          <div class="avalilable-img" v-if="!isAvalilable"></div>
          <span class="fooditem-top__number"> {{ Foodnumber }} </span>
          <img v-bind:src="imgsource" />
          <i class="fas fa-pizza-slice fooditem-top__bg" />
      </div>
      <div class="fooditem-content">
        <h4>
            <a>{{ Title }}</a>
        </h4>
        <p class="fooditem-content__description">
            {{ Description }}
        </p>
        <div class="fooditem-content__price">
           Cena: {{ Price }}zł
        </div>
        <div class="avalilable-text" v-if="!isAvalilable">
            Produkt tymczasowo niedostępny, przepraszamy
        </div>
        <div class="dishofday" v-if="IsDishOfDay">
            <i class="fab fa-hotjar"></i>
            Danie dnia
        </div>
        <div class="rating">
            <div class="star" v-for="(star, index) in Math.floor(ratingInStars)" :key="index" :class="{ isNoRatings: isNoRatings }">
                <i class="fas fa-star"></i>
            </div>
            <div class="star" v-if="isHalfStar" :class="{ isNoRatings: isNoRatings }">
                <i class="fas fa-star-half-alt"></i>
            </div>
            <div class="star" v-for="(star, index) in Math.floor(5 - ratingInStars)" :key="index" :class="{ isNoRatings: isNoRatings }">
                <i class="far fa-star"></i>
            </div>
            <div v-if="Rating == 0" class="no-ratings">
                <span>Brak ocen</span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Service from '../Service/Service'
export default {
    name: "Fooditem",
    props: {
        id: { type: Number, required: true },
        Title: { type: String, required: true },
        Description: { type: String, required: true },
        Price: { type: String, required: true },
        imgsource: { type: String, required: true },
        Foodnumber: { type: Number, required: true },
        IsDishOfDay: { type: Number, required: false },
        isAvalilable: { type: Number, required: false }
    },
    data() {
        return {
            Rating: 0,
            isNoRatings: false
        }
    },
    computed: {
        ratingInStars() {
            return Math.round(this.Rating*2)/2;
        },
        isHalfStar() {
            if (this.ratingInStars % Math.floor(this.ratingInStars) > 0) {
                return true
            }
            return false;
        }
    },
    async created() {
        const temp = await Service.getRatings(this.id);
        if (temp.data.length != 0) {
            let allRatings = 0;
            for (const item in temp.data) {
                allRatings = allRatings + temp.data[item].Rating;
            }
            let avgAllRatings = allRatings / temp.data.length;
            this.Rating = avgAllRatings;
        } else {
            this.Rating = 0;
            this.isNoRatings = true;
        }
    }
}
</script>

<style scoped>
.avalilable-text {
    position: absolute;
    color: red;
    top: 50%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
}
.rating {
    position: absolute;
    bottom: 5px;
    left: 10px;
    display: flex;
}
.no-ratings {
    position: absolute;
    color: red;
    font-weight: bold;
    font-size: 1.1rem;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
}
.isNoRatings {
    opacity: 0.4;
}

.avalilable-img {
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(to bottom right, rgba(0,0,0,0) calc(50% - 10px), red, rgba(0,0,0,0) calc(50% + 10px));
    position: absolute;
}
.dishofday {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 50%;
    font-size: 1.5em;
    animation: colorchanging 1s infinite;
}

.fooditem {

    height: 400px;
    background-color: #1b1b1b;

    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    border-right: 3px solid black;
    border-bottom: 3px solid black;
    border-radius: 3px;

    overflow: hidden;

}
.fooditem:hover {
    cursor: pointer;
}

.fooditem-top {
    height: 50%;

    overflow: hidden;
    position: relative;
}
.fooditem-top > img {
    width: 100%;
    height: auto;

    z-index: 3;
    transition: transform 0.5s ease-in-out;

}
.fooditem-top:hover > img {
    transform: scale(1.5) rotate(20deg);
}


.fooditem-top__number {
    background-color: #1b1b1b;
    width: 1em;
    height: auto;
    padding: 0.2em;

    font-size: 2em;
    color: rgb(255, 205, 124);

    position: absolute;
    right: 0;
    top: 0;
    z-index: 4;

    border-bottom-left-radius: 0.3em;
}

.fooditem-top__bg {
    color: rgba(255, 205, 124, 0.7);
    width: 30%;
    height: auto;

    margin-top: 1em;
}

.fooditem-content {
    height: 50%;
    background-color: #1b1b1b;
    color: rgb(255, 205, 124);

    display: flex;
    flex-direction: column;
    padding: 0.5em;
    position: relative;
}
.fooditem-content > h4 {
    text-align: left;
    padding: 0.3em;
    margin: 0;

    border-bottom: 1px solid rgb(255, 205, 124);;
}
.fooditem-content > p {
    text-align: left;
    font-size: 0.9em;
}
.fooditem-content__price {
    width: 100%;

    text-align: right;
    margin-top: auto;
}

@keyframes colorchanging {
    0% {
        color: rgb(255, 205, 124);
    }
    50% {
        color: chocolate;
    }
    100% {
        color: rgb(255, 205, 124);
    }
}

</style>