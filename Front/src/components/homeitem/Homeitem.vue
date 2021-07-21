<template>
    <router-link :to="to" class="homeitem">
        <img v-bind:src="imgsource" />
        <span class="homeitem-name">{{ name }}</span>  
    </router-link>
</template>

<script>

export default {
    name: "homeitem",
    props: {
        to: { type: String, required: false },
        name: { type: String, required: true },
        imgsource: { type: String, required: false }
    },
}
</script>

<style scoped>
.homeitem {
    max-width: 750px;
    height: 200px;
    background-color: #1b1b1b;
    margin: 1em;
    flex: 1;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    overflow: hidden;

    text-decoration: none;
    color: white;
}

.homeitem > img {
    width: 100%;
    height: auto;
    position: absolute;
    z-index: 1;
    transition: transform 1s ease-in-out;
}

.homeitem:hover > img {
    transform: scale(1.5);
}

.homeitem:hover {
    cursor: pointer;
}

.homeitem:hover > .homeitem-name {
    transform: scale(1.2);
}

.homeitem > .homeitem-name {
    z-index: 2;
    font-size: 2em;
    font-weight: bold;
    transition: transform 1s ease-in-out;
    color: #1b1b1b;
    text-shadow: -1px 0 #ffcd7c, 0 1px #ffcd7c, 1px 0 #ffcd7c, 0 -1px #ffcd7c;
}

@media (max-width: 880px) {
  .homeitem {
    max-width: 900px;
    height: 400px;
    
  }
}

</style>