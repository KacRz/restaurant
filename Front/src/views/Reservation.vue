<template>
  <div class="reservation">
    <div class="reservation-title">
      <h2>Rezerwacje</h2>
      <div class="reservation-title__date">
        <h4>Wybierz dzień</h4>
        <datepicker v-model="time1" :upperLimit = "upperLimit" :lowerLimit = "lowerLimit"/>
        <div class = "hours">
          <VueTimepicker :modelValue= "time2" @update:modelValue="updateHour"  :minuteInterval = 15 :hourRange= "DefaultHourRange" ></VueTimepicker>  
        
        </div>
        <p style="font-size:0">{{timeChangeHandler}} </p>
      </div>
    </div>
    <div class="reservation-sandbox">
      <Sandbox @response = getTableNumber @tables = getTables :disabled = disabledTables />
    </div>
    <div class="button"  @click="print()" > 
            <span>Dodaj kategorię</span><i class="far fa-save" ></i>
    </div>
      
      <div v-show="focusArea">
      <h4>Wybierz godzinę rozpoczęcia rezerwacjii</h4>
      <VueTimepicker :modelValue= "time2" @update:modelValue="updateHour"  :minuteInterval = 15 :hourRange= "DefaultHourRange" ></VueTimepicker>
      <h4>Wybierz godzinę zakończenia rezerwacjii</h4>
      <VueTimepicker :modelValue= "time2" @update:modelValue="updateHour"  :minuteInterval = 15 :hourRange= "DefaultHourRange" ></VueTimepicker>

    </div>

  </div>
</template>

<script>
import Sandbox from '../components/reservationitems/sandbox.vue';
import Datepicker from 'vue3-datepicker';
import ClientService from '../Service/ClientService.js'
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'
export default {
    name: "reservation",
    data() {
      return {
        upperLimit: new Date(),
        lowerLimit: new Date(),
        time1: new Date(),
        time2: {HH: "08", mm:"00"},
        reservations: [],
        reservationsDays: [],
        focusArea: false,
        activeTable: -1,
        DefaultHourRange: [8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        activeTime: -1,
        availableTables: [],
        disabledTables: [], 
      }
    },
    components: {
      Sandbox,
      Datepicker,
      VueTimepicker
    },
    methods:
    {
      getTables(tables)
      {
        this.availableTables = tables;
      },
      print()
      {
        this.focusArea =!this.focusArea;
        console.log(this.time1);
      },
      async getTableNumber(number)
      {
          this.activeTable = number;
      },
      updateHour(time)
      { 
        this.time2 = time;
      },
      FormatForDatetime(tim)
      {
        if(tim.length===1)
        {
          
          return "0".concat(tim)
        }
        return tim;
      },
      isBetween(time,start, end)
      {
        if( (time.HH > start.HH || (time.HH == start.HH && time.mm > start.mm)) && (time.HH < end.HH || (time.HH == end.HH && time.mm <= start.mm)) )
        {
          return true;
        }
        return false;
      },
      clearTables()
      {
        this.disabledTables = [];
      },
      pushTable(id)
      {
        this.disabledTables.push(id);
      }

    },
    computed:
    {
      timeChangeHandler(){
        let tmp = this.reservationsDays.indexOf(this.time1.toDateString());
        this.clearTables();
        if(tmp != -1)
        {
          
          for(let i=0; i< this.reservations[tmp].length; i++)
          {
            if(this.isBetween(this.time2, this.reservations[tmp][i].Start,this.reservations[tmp][i].End))
            {
              this.pushTable( this.availableTables.indexOf(this.reservations[tmp][i].idStolika))
            }
          }
        }
        console.log(this.disabledTables)
        return this.reservationsDays.indexOf(this.time1.toDateString());
      },
    },
    async created()
    {
      this.time2.HH = this.FormatForDatetime(this.time1.getHours().toString());
      this.time2.mm = this.FormatForDatetime(this.time1.getMinutes().toString());
      this.upperLimit = new Date(new Date().setDate(this.upperLimit.getDate()+7));
      //data is sorted by ReservationStart
      let reservations =await ClientService.getReservationTimes(this.$store.getters['user/getToken'])
      let tmp = 0;
      let temp = 0;
      let tmp2 = 0;
      for(let i = 0; i< reservations.data.length;i++)
      {
        tmp = new Date(Date.parse(reservations.data[i].ReservationStart));
        tmp2 = new Date(Date.parse(reservations.data[i].ReservationEnd))
        temp = tmp.toDateString();
        if(!this.reservationsDays.includes(temp))
        {
          this.reservationsDays.push(temp)
          this.reservations.push([]);         
          this.reservations[this.reservationsDays.indexOf(temp)].push(
            {idStolika: reservations.data[i].Table_fk, 
            Start: {HH: this.FormatForDatetime(tmp.getHours().toString()), mm: this.FormatForDatetime(tmp.getMinutes().toString())},
            End: {HH: this.FormatForDatetime(tmp2.getHours().toString()), mm: this.FormatForDatetime(tmp2.getMinutes().toString())}            
            });
        }
        else
        {
          this.reservations[this.reservationsDays.indexOf(temp)].push(
            {idStolika: reservations.data[i].Table_fk, 
            Start: {HH: this.FormatForDatetime(tmp.getHours().toString()), mm: this.FormatForDatetime(tmp.getMinutes().toString())},
            End: {HH: this.FormatForDatetime(tmp2.getHours().toString()), mm: this.FormatForDatetime(tmp2.getMinutes().toString())}            
            });
        }
      }
    },

}
</script>

<style scoped>
.reservation {
  background-color: #1b1b1b;
  color: rgb(255, 205, 124);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.reservation-info {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
}
.reservation-sandbox {
  width: 80%;
  max-height: 500px;
}
.reservation-title__date {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}
.reservation-title__date > h4 {
  margin-right: 1em;
}
.arrow {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.arrow:hover {
  cursor: pointer;
}

@media (max-width: 880px) {
  .reservation-sandbox {
    width: 95%;
  }
}
button
{
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    margin: 0 0.3em;
    border-radius: 10px;
    font-size: 1.2em;

    transition: padding 0.3s, background-color 0.3s;
    
}
.hours
{

  font-size: 0.5em;
}

</style>
