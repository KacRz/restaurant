<template>
    <div class="homeitem">
        <h1>{{ name }}</h1>
    </div>
</template>

<script>

export default {
    props: {
        to: { type: String, required: false },
        name: { type: String, required: true }
    },
}
</script>

<style scoped>
.homeitem {
    background-color: red;
    margin: 0.7em;
    padding: 0.7em;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.homeitem:hover {
    cursor: pointer;
}
</style>