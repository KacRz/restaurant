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
            <span>{{ price }} zł</span>
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
        number: { type: String, required: true }
    },
}
</script>

<style scoped>


.fooditem {
    width: 300px;
    height: 400px;
    background-color: brown;

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
    background-color: brown;
    width: 1em;
    height: auto;
    padding: 0.2em;

    font-size: 2em;
    color: white;

    position: absolute;
    right: 0;
    top: 0;
    z-index: 4;

    border-bottom-left-radius: 0.3em;
}

.fooditem-top__bg {
    color: rgba(255, 255, 255, 0.9);
    width: 50%;
    height: auto;

    margin-top: 1em;
}

.fooditem-content {
    height: 50%;
    background: rgb(165,42,42);
    background: linear-gradient(146deg, rgba(165,42,42,1) 0%, rgba(140,49,49,1) 75%, rgba(165,42,42,1) 100%); 
    color: white;

    display: flex;
    flex-direction: column;
    padding: 0.5em;
}
.fooditem-content > h4 {
    text-align: left;
    padding: 0.3em;
    margin: 0;

    border-bottom: 1px solid black;
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