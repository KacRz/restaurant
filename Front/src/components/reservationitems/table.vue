<template>
    <div class="table" :class="size" v-on:click="response()">
        {{ name }}
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        size: String,
        name: String
    },
    methods:
    {
      response()
      {
          this.$emit('response', this.name);
      }  
    },

}
</script>

<style scoped>
.table {
    background-color: brown;
    border-radius: 5px;
}
.small {
    width: 5vw;
    height: 5vw;
}
.big {
    width: 10vw;
    height: 5vw;
}
.table:hover {
    cursor: pointer;
}

@media (max-width: 880px) {
    .small {
    width: 8vw;
    height: 8vw;
    }
    .big {
        width: 16vw;
        height: 8vw;
    }
}

</style>