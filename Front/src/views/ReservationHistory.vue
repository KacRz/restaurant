<template>
  <div class="reservation-history">
    <table class="history-table">
        <tr><td></td>
        <td>Numer Stolika</td>         
        <td>Dzień rezerwacjii</td>
        <td>Godzina rozpoczęcia <br>rezerwacji</td>
        <td>Godzina zakończenia <br>rezerwacji</td>
        <td>Data stworzenia <br> rezerwacjii</td></tr>
        <tr v-for="item in clientReservations" :key="item">
        <td>
            <div v-if="isDeletable(item.id)">
                <DeleteReservation v-bind:resID = "item.id" @response = deleteResponse />
            </div>
        </td>
        <td>{{item.TableNumb}}</td>
        <td>{{item.Day}}</td>
        <td>{{item.TimeStart.HH}}:{{item.TimeStart.mm}}</td>
        <td>{{item.TimeEnd.HH}}:{{item.TimeEnd.mm}}</td>
        <td>{{item.CreatedAt}}</td>
        </tr>   
    </table>



  </div>
</template>

<script>
import ClientService from '../Service/ClientService'
import DeleteReservation from '../components/reservationitems/DeleteReservation.vue'
export default {
    name: "ReservationHistory",
    components:
    {
        DeleteReservation,
    },
    data()
    {
        return{
            clientReservations: [],

        }
    },
    methods:
    {
    FormatForDatetime(tim)
      {
        if(tim.length===1)
        {
          return "0".concat(tim)
        }
        return tim.toString();
      },
    deleteResponse(id)
    {
    this.clientReservations.splice(this.findIndexOfID(id),1)
    },
    isDeletable(id)
    {
        let x = this.findIndexOfID(id);
        let now = new Date(Date.now());
        let tomorow = new Date(now.getFullYear(),now.getMonth(), now.getDate()+1)
        if(this.clientReservations[x].DateDay <=tomorow)
        {
            return false;
        }
        return true;
    },
    findIndexOfID(id)
    {
        for(let i = 0; i< this.clientReservations.length; i++)
        {
            if(this.clientReservations[i].id == id)
                return i;
        }
    }
    },
    
    async created()
    {
        
        let clientReservation = await ClientService.getAllClientReservations(this.$store.getters['user/getToken'], this.$store.getters['user/getEmail']);
        for(let i = 0 ; i < clientReservation.data.length; i++)
        {
            let tmp1 = new Date(clientReservation.data[i].ReservationStart);
            let tmp2 = new Date(clientReservation.data[i].ReservationEnd);
            let tmp3 = new Date(clientReservation.data[i].CreatedAt)
            this.clientReservations.push({
            id: clientReservation.data[i].id, 
            TableNumb: clientReservation.data[i].Table_fk,
            CreatedAt: tmp3.getDate().toString()+'/'+(tmp3.getMonth()+1).toString()+'/'+tmp3.getFullYear()+' '+this.FormatForDatetime(tmp3.getHours().toString())+':'+this.FormatForDatetime(tmp3.getMinutes().toString()),
            Day: tmp2.getDate().toString()+'/'+(tmp2.getMonth()+1).toString()+'/'+tmp2.getFullYear(),
            DateDay: tmp2,
            TimeStart: {HH: this.FormatForDatetime(tmp1.getHours().toString()),  mm: this.FormatForDatetime(tmp1.getMinutes().toString())},
            TimeEnd:   {HH: this.FormatForDatetime(tmp2.getHours().toString()),  mm: this.FormatForDatetime(tmp2.getMinutes().toString())}            
            })
        }
    }

}
</script>

<style scoped>
.reservation-history
{
    background-color: #1b1b1b;
  color: rgb(255, 205, 124);
  width: 100%;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.history-table
{
    border-spacing: 10px;
}
</style>

