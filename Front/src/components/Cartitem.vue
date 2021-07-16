<template>
  <div class="cart-element">
          {{ number }}{{ title }}
          <p>{{ description }}</p>
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
    height: 100px;
    box-sizing: border-box;
    padding: 0.3em;

    display: flex;
    flex-direction: row;
    justify-content: flex-wrap;
    align-items: center;

    font-size: 2em;
}

.cart-element > p {
    font-size: 0.4em;
}

</style>