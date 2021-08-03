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
      </div>
  </div>
</template>

<script>
export default {
    name: "Fooditem",
    props: {
        Title: { type: String, required: true },
        Description: { type: String, required: true },
        Price: { type: String, required: true },
        imgsource: { type: String, required: true },
        Foodnumber: { type: Number, required: true },
        IsDishOfDay: { type: Number, required: false },
        isAvalilable: { type: Number, required: false }
    },
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