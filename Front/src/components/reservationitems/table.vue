<template>
    <div class="tables" :class="[size ,{'table': !isDisabled, 'table-disabled': isDisabled }]" v-on:click="response()" >
       {{ name }}
    <div class = "active" v-show=isActivated()>
    </div>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        size: String,
        name: Number,
        isDisabled: Boolean,
        isActive: Boolean,
    },
    methods:
    {
      response()
      {
          this.$emit('response', this.name);
      },
      isActivated()
      {
          return this.$props.isActive;
      }
    },

}
</script>

<style scoped>

.tables
{
    position: relative;

}
.active
{
    position: absolute;
    height: 50%;
    width: 50%;
    left: 25%;
    top:25%;
    background-color: green;
    z-index: 3;
}
.table {
    background-color: brown;
    border-radius: 5px;
}
.table-disabled
{
    background-color: red;
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