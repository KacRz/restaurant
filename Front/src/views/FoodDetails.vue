<template>
  <div class="addto-cart">
      <div class="addto-cart__info">
            <router-link to="/menu" class="addto-cart__exit">
                <i class="fas fa-times-circle"></i>
            </router-link>
          <span class="addto-cart__number"> {{ details.Foodnumber }} </span>
          <div class="addto-cart__title">
            <h1>{{ details.Title }}</h1>
          </div>
          <div class="addto-cart__info-content">
              <div class="addto-cart__info-content-img">
                <img v-bind:src="details.imgsource" />
              </div>
              <div class="addto-cart__info-content-description">
                <p>
                    {{ details.Description }}
                </p>
                <div class="addto-cart__price">
                   Cena: {{ details.Price }}zł
                </div>
              </div>
          </div>
      </div>

      <div class="addto-cart__bottom">
          <div class="addto-cart__delete-button" v-on:click="removeItem">
              <span>Usuń z koszyka</span><i class="fas fa-trash-alt"></i>
          </div>
          <div class="addto-cart__add-button" v-on:click="addToCart">
              <span>Dodaj do koszyka</span><i class="fas fa-cart-plus" />
          </div>
      </div>

  </div>
</template>

<script>
export default {
    name: "FoodDetails",
    data() {
        return {
            details: this.$route.params,
        }
    },
    methods: {
        addToCart() {
            this.$store.dispatch("addToCart", this.details);
        },
        removeItem() {
            this.$store.dispatch("removeItem", this.details);
        }
    },
    created() {
        if (this.$route.params.id !== undefined){
            localStorage.setItem("details", JSON.stringify(this.$route.params))
        }
    },
    mounted() {
        this.details = JSON.parse(localStorage.getItem("details"));
    }
}
</script>

<style scoped>
.addto-cart {
    width: 80%;
    background-color: #1b1b1b;
    margin-top: 2em;

    border: 1px solid black;
    border-radius: 10px;

    color: rgb(255, 205, 124);;

    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
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
    text-decoration: none;
    color: white;

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
    color: rgb(255, 205, 124);

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

.addto-cart__price {
    margin-top: auto;
    margin-left: auto;
    padding: 0.5em;
    font-size: 2em;
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
    max-height: 400px;
    display: flex;
    overflow: hidden;


    justify-content: center;
    align-items: center;
}
.addto-cart__info-content-description {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
    padding-left: 1em;
}

.addto-cart__bottom {
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0.3em;
}

.addto-cart__add-button {
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    margin: 0 0.3em;
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

.addto-cart__delete-button {
    background-color: red;
    color: white;
    padding: 0.5em 1.2em;
    border-radius: 10px;
    font-size: 1.2em;
    margin: 0 0.3em;

    transition: padding 0.3s, background-color 0.3s;
}

.addto-cart__delete-button:hover {
    background-color: rgb(211, 43, 43);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}


@media (max-width: 750px) {
    .addto-cart {
        font-size: 0.8em;
    }
    .addto-cart__info-content {
    display: flex;
    flex-direction: column;
    }
    .addto-cart__info-content-description {
        width: 100%;
    }
    .addto-cart__info-content-img {
        display: none;
    }
    .addto-cart__delete-button > span {
        display: none;
    }
    .addto-cart__add-button > span {
        display: none;
    }
}

</style>