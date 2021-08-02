<template>
  <div class="reservation">
    <div class="reservation-title">
      <h2>Rezerwacje</h2>
      <div class="reservation-title__date">
        <h4>Wybierz dzień</h4>
        <datepicker v-model="time1" />
        <div class = "hours">
          <VueTimepicker :modelValue="yourVar" @update:modelValue="yourHandler" ></VueTimepicker>  
        
        </div>
      </div>

      <div class="reservation-info">
        Wolne stoliki: 
      </div>
    </div>
    <div class="reservation-sandbox">
      <Sandbox @response = getTableNumber />
    </div>
    <div class="button"  @click="print()" > 
            <span>Dodaj kategorię</span><i class="far fa-save" ></i>
    </div>
  <div class="reservation-area">
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
        time1: new Date(),
        time2: new Date(),
        defaultHour:new Date().getHours(),
        defaultMinute:new Date().getMinutes(),
        reservations: [],
        focusArea: false,
        activeTable: -1,
      }
    },
    components: {
      Sandbox,
      Datepicker,
      VueTimepicker
    },
    methods:
    {
      print()
      {
        console.log(this.time1);
      },
      async getTableNumber(number)
      {
        
        if(this.activeTable!== number)
        {
          this.activeTable = number;
          this.reservations = await ClientService.getReservationTimes(this.$store.getters['user/getToken'],number)
          console.log(this.reservations)
        }
        this.focus();
      },
      timeChangeHandler(){
            return 0;
      },

      showField(){

            return this.focusArea;
      },
      focus()
      {
        this.focusArea = true;
      },
      blur()
      {
        this.focusArea = false;
      },
      findIndexByNumber()
      {
        
      }
    },
    async created()
    {
      
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
