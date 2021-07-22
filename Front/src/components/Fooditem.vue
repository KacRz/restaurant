<template>
  <div class="fooditem">
      <div class="fooditem-top">
          <span class="fooditem-top__number"> {{ number }} </span>
          <img v-bind:src="imgsource" />
          <i class="fas fa-pizza-slice fooditem-top__bg" />
      </div>
      <div class="fooditem-content">
        <h4>
            <a>{{ title }}</a>
        </h4>
        <p class="fooditem-content__description">
            {{ description }}
        </p>
        <div class="fooditem-content__price">
           Cena: {{ price }}zł
        </div>
      </div>

  </div>
</template>

<script>
export default {
    name: "Fooditem",
    props: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        imgsource: { type: String, required: true },
        number: { type: String, required: true },
        Name: { type: String, required: true }
    },
}
</script>

<style scoped>


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
    color: rgb(255, 205, 124);;

    position: absolute;
    right: 0;
    top: 0;
    z-index: 4;

    border-bottom-left-radius: 0.3em;
}

.fooditem-top__bg {
    color: rgba(27, 27, 27, 0.9);
    width: 50%;
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


</style>