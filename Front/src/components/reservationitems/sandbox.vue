<template>
    <div class="sandbox">
        <div class="row">
            <Table size="small" :name=tables[0] :isDisabled="isTableDisabled(0)"  @response= TableResponse />
            <Table size="small" :name=tables[1] :isDisabled="isTableDisabled(1)"  @response= TableResponse />
            <Table size="small" :name=tables[2] :isDisabled="isTableDisabled(2)"  @response= TableResponse />
            <Table size="small" :name=tables[3] :isDisabled="isTableDisabled(3)"  @response= TableResponse />
            <Table size="small" :name=tables[4] :isDisabled="isTableDisabled(4)"  @response= TableResponse />
        </div>
        <div class="row">
            <Table size="big" :name=tables[10] :isDisabled="isTableDisabled(10)" @response= TableResponse />
            <Table size="big" :name=tables[11] :isDisabled="isTableDisabled(11)" @response= TableResponse />
            <Table size="big" :name=tables[12] :isDisabled="isTableDisabled(12)" @response= TableResponse />
            <Table size="big" :name=tables[13] :isDisabled="isTableDisabled(13)" @response= TableResponse />
        </div>
        <div class="row">
            <Table size="small" :name=tables[5] :isDisabled="isTableDisabled(5)" @response= TableResponse />
            <Table size="small" :name=tables[6] :isDisabled="isTableDisabled(6)" @response= TableResponse />
            <Table size="small" :name=tables[7] :isDisabled="isTableDisabled(7)" @response= TableResponse />
            <Table size="small" :name=tables[8] :isDisabled="isTableDisabled(8)" @response= TableResponse />
            <Table size="small" :name=tables[9] :isDisabled="isTableDisabled(9)" @response= TableResponse />
        </div>
    </div>
</template>

<script>
import Table from './table.vue'

export default {
    name: "sandbox",
    components: {
        Table
    },
props:
{
    disabled: {type: Array, required: false},
},
data() 
{
      return {
        tables: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
        
      }
    },
    methods:
    {
        TableResponse(name)
        {
            this.$emit('response', name);
        },
        isTableDisabled(id) 
        {
        console.log(this.$props.disabled.includes(id))
        return this.$props.disabled.includes(id);
        }
    },
    created()
    {
        this.$emit('tables', this.tables);
    },
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