<template>
  <div class="addto-cart">
      <div class="addto-cart__info">
          <div class="addto-cart__exit" v-on:click="closeWindow">
              <i class="fas fa-times-circle"></i>
          </div>
          <span class="addto-cart__number"> {{ number }} </span>
          <div class="addto-cart__title">
            <h2>{{ title }}</h2>
          </div>
          <div class="addto-cart__info-content">
              <div class="addto-cart__info-content-img">
                <img v-bind:src="imgsource" />
              </div>
              <div class="addto-cart__info-content-description">
                <p>
                    {{ description }}
                </p>
              </div>
          </div>
      </div>

      <div class="addto-cart__bottom">
          <!-- TODO: Wybieranie rozmiaru? dodatków? -->
          <h3>Wybierz rozmiar</h3>
          <div class="addto-cart__add-button">
              Dodaj do koszyka<i class="fas fa-cart-plus" />
          </div>
      </div>

  </div>
</template>

<script>
export default {
    name: "AdditemToCart",
    props: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        imgsource: { type: String, required: true },
        number: { type: String, required: true }
    },
    methods: {
        closeWindow() {
            this.$emit('closeNow');
        }
    }
}
</script>

<style scoped>
.addto-cart {
    width: 70vw;
    height: 80vh;
    background: rgb(165,42,42);
    background: linear-gradient(146deg, rgba(165,42,42,1) 0%, rgba(140,49,49,1) 75%, rgba(165,42,42,1) 100%);
    margin-top: 2em;

    position: fixed;
    z-index: 20;

    border: 1px solid black;
    border-radius: 10px;

    color: white;

    display: flex;
    flex-direction: column;
}
.addto-cart__info {
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;
}
.addto-cart__exit {
    position: absolute;
    top:0;
    right: 0;

    width: 60px;
    height: 60px;
    overflow: hidden;

    font-size: 3em;

    display: flex;
    align-items: center;
    justify-content: center;
}
.addto-cart__exit:hover {
    color:rgb(203, 214, 209);
}
.addto-cart__number {
    width: 1em;
    height: auto;
    padding: 0.2em;

    font-size: 2em;
    color: white;

    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;

    border-bottom-left-radius: 0.3em;
}

.addto-cart__exit:hover {
    cursor: pointer;
}

.addto-cart__title {
    display: block;
}
.addto-cart__info-content {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    
}
.addto-cart__info-content-img > img {
    width: 100%;
    height: auto;
    border-radius: 3px;

    transition: transform .5s ease-in;
}
.addto-cart__info-content-img > img:hover {
    transform: scale(1.2);
    cursor: pointer;
}

.addto-cart__info-content-img {
    width: 40%;
    height: 100%;
    display: flex;
    overflow: hidden;

    justify-content: center;
    align-items: center;
}
.addto-cart__info-content-description {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: flex-start;

    box-sizing: border-box;
    padding-left: 1em;
}

.addto-cart__bottom {
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.addto-cart__add-button {
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    border-radius: 10px;
    font-size: 1.2em;

    transition: padding 0.3s, background-color 0.3s;
}

.addto-cart__add-button:hover {
    background-color: rgb(50, 187, 50);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}


@media (max-width: 750px) {
    .addto-cart__info-content {
    display: flex;
    flex-direction: column;
    }
    .addto-cart__info-content-description {
        width: 100%;
    }
    .addto-cart__info-content-img {
        width: 100%;
    }
    .addto-cart__info-content-img > img {
    width: 30%;
    height: auto;
    overflow: hidden;
    }
}

</style>