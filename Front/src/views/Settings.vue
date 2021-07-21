<template>
    <div class="settings">
        <div class="settings-user">
            <h2>Dane konta</h2>
            <div class="content">
                <span class="title">Imię</span>
                <span class="data"> {{ firstname }} </span>
            </div>
            <div class="content">
                <span class="title">Nazwisko</span>
                <span class="data"> {{ lastname }} </span>
            </div>
            <div class="content">
                <span class="title">Email</span>
                <span class="data"> {{ email }} </span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "Settings",
    data() {
        return {
            firstname: 'Kacper',
            lastname: 'Poziomka',
            email: 'testowy@gmail.com',

        }
    }
}
</script>

<style scoped>
.settings {
    width: 100%;
    color: rgb(255, 205, 124);;
    background-color: #1b1b1b;;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.settings-user {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.settings-data {
    margin-top: 1em;
    width: 100%;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;

    font-size: 1.5em;
    margin-bottom: 0.5em;
}

.title {
    width: 30%;
    text-align: left;
}

.data {
    width: 70%;
    text-align: left;
}

</style>