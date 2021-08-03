<template>
    <div class="homeinfo">
        <div class="homeinfo-icon">
            <i class="icon" :class="icon" />
        </div>
        <div class="homeinfo-content">
            <div>
                <div v-for="(data, index) in content" :key="index" class="info">
                    {{ data }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "homeinfo",
    props: {
        content: { type: Array, required: false },
        icon: { type: String, required: true },
    },
}
</script>

<style scoped>
.homeinfo {
    max-width: 500px;
    height: 250px;
    background-color: rgba(27, 27, 27, 0.8);
    margin: 1em;
    box-sizing: border-box;
    flex: 1;
    color: rgb(255, 205, 124);

    border-radius: 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.info {
    padding-right: 0.5em;
}

.homeinfo-content {
    width: 70%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.5em;
}

.homeinfo-icon {
    width: 30%;
    height: 100%;
    box-sizing: border-box;
    padding: 0.3em;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
}

@media (max-width: 880px) {
  .homeinfo {
    flex: 100%;
    max-width: 900px;
    height: 300px;
    box-sizing: border-box;
  }

  .homeinfo-icon {
      max-width: auto;
  }
}

.homeinfo:hover {
    animation: shake 1s infinite linear;
    cursor: pointer;
}
@keyframes shake {
    0% {
        transform: translate(0px, 2px);
    }
    50% {
        transform: translate(0px, -2px);
    }
    100% {
        transform: translate(0px, 2px);
    }
}

</style>