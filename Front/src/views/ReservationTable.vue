<template>
  <div>
      Ulu mulu
  </div>
</template>

<script>
import ClientService from '../Service/ClientService'
export default {
    name: "ReservationTable",
    data()
    {
        return{
            date: this.$route.params.Date,
            table: this.$route.params.Table,
            reservations: '',

           
        }
    },
    methods:
    {
        
    },
    async created()
    {
        this.reservations = await ClientService.getReservationTimes(this.$store.getters['user/getToken'],this.table);
        console.log(this.reservations);
    }
}
</script>

<style>

</style>