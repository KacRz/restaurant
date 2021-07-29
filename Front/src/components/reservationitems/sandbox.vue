<template>
    <div class="sandbox">
        <div class="row">
            <Table size="small" name="1"/>
            <Table size="small" name="2"/>
            <Table size="small" name="3"/>
            <Table size="small" name="4"/>
            <Table size="small" name="5"/>
        </div>
        <div class="row">
            <Table size="big" name="11"/>
            <Table size="big" name="12"/>
            <Table size="big" name="13"/>
            <Table size="big" name="14"/>
        </div>
        <div class="row">
            <Table size="small" name="6"/>
            <Table size="small" name="7"/>
            <Table size="small" name="8"/>
            <Table size="small" name="9"/>
            <Table size="small" name="10"/>
        </div>
    </div>
</template>

<script>
import Table from './table.vue'

export default {
    name: "sandbox",
    components: {
        Table
    }
}
</script>

<style scoped>
.sandbox {
    width: 100%;
    height: 400px;
    background-image: url(https://images.unsplash.com/photo-1525034687081-c702010cb70d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);
}

.row {
    width: 100%;
    height: 33.3%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

@media (max-width: 880px) {
    .sandbox {
        height: 300px;
    }
}
</style>