<template>
    <div class="staff">
        <ul class="staff-list">
        <li v-for="person in staff.data" :key="person.id"><PersonPanel v-bind="person" /></li>
        </ul>         
    </div>
</template>

<script>
import ManagerService from '../Service/ManagerService'
import PersonPanel from  '../components/StaffItems/PersonPanel.vue'
export default {
    name:"Staff",
    components: {
        PersonPanel,
    },
    data(){
        return {staff:[]};
    },
    async created(){
        if(!this.$store.getters['user/getLogged'] || !this.$store.getters['user/getMode'] == 'Kierownik')
            this.$router.push("/");
        else{
            this.staff = await ManagerService.getStaff(this.$store.state.user.token);
            console.log(this.staff.data)
        }
    }


}
</script>

<style scoped>
.staff
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}
.staf-list
{

}
ul
{
    padding: 0;
    margin:0;
}
</style>