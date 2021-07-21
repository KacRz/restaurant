<template>
    <div class="summary">
        <div class="summary-form">
            lorem ipsum
        </div>
        <div class="summary-total">
            <h2>Suma: {{ totalPrice.toFixed(2) }}zł</h2>
            <div class="summary-btn" v-on:click="submit">
                Dalej<i class="fas fa-arrow-alt-circle-right"></i>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: "Summary",
    props: [
        "totalPrice"
    ],
    methods: {
        submit() {
            alert("Złożyłeś założenie");
        }
    }
}
</script>

<style scoped>
.summary {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.summary-total {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-right: 1em;
}
.summary-total > h2 {
    display: block;
    margin-right: auto;
    padding-left: 1em;
}
.summary-btn {
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    border-radius: 10px;
    font-size: 1.2em;
    margin-right: 1em;

    transition: padding 0.3s, background-color 0.3s;
}
.summary-btn:hover {
    background-color: rgb(50, 187, 50);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}
.fa-arrow-alt-circle-right {
    margin-left: 0.3em;
}
</style>