<template>
  <div class="cart-element">
      <div class="cart-element__number">
          {{ number }}.
      </div>
      <div class="cart-element__title">
          {{ title }}
      </div>
      <div class="cart-element__description">
          {{ description }}
      </div>
      <div class="cart-element__info">
          Ilość 1  Cena {{ price }}
          <i class="fas fa-times-circle"></i>
      </div>
  </div>
</template>

<script>
export default {
    name: "Cartitem",
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
.cart-element {
    width: 100%;
    box-sizing: border-box;
    padding: 0.3em;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    font-size: 1.5em;

    margin-bottom: 0.3em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
.cart-element__number {
    height: 100%;
    margin-left: 0.3em;
    margin-right: 0.3em;
}

.cart-element__title {
    height: 100%;
    margin-left: 0.3em;
    margin-right: 0.3em;
    width: 200px;

    text-align: left;
}

.cart-element__description {
    width: 400px;
    height: 100%;
    margin-left: 0.3em;
    margin-right: 0.3em;

    font-size: 0.5em;
    text-align: left;
}

.cart-element__info {
    margin-left: auto;
}

</style>