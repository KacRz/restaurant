<template>
  <div class="reservation" >
    <div class="reservation-title">
      <h2>Rezerwacje</h2>
      <div class="reservation-title__date">
        <h4>Wybierz dzień</h4>
        <datepicker v-model="time1" :upperLimit = "upperLimit" :lowerLimit = "lowerLimit"/>
        <div class = "hours">
          <h3 v-show="!showField('H1')" @click="focusField('H1')" style="marginLeft: 1em">{{ first_timePicker}}</h3>
          <div v-show="showField('H1')">
          <VueTimepicker :modelValue="time2" @update:modelValue="updateHour"  :minuteInterval = 15 :hourRange= "DefaultHourRange"  @focus="focusField('H1')" @blur="blurField" ></VueTimepicker>  
          </div>
        </div>
        <p style="font-size:0">{{timeChangeHandler}} </p>
      </div>
    </div>
    <div class="reservation-sandbox">
      <Sandbox @response = getTableNumber @tables = getTables :disabled = disabledTables :selected = activeTable />
    </div>
    <div v-if="!isStaff()" class = "area">
    <div class="button-toggle-area"  @click="changeFocus()" > 
            <span>Wybierz czas rezerwacjii </span><i class="fas fa-calendar"></i>
    </div>
      
      <div v-show="focusArea">
      <h4>Wybierz godzinę rozpoczęcia rezerwacjii</h4>
      
      <h3 v-show="!showField('H2')" @click="focusField('H2')">{{ second_timePicker }}</h3>
      <div v-show="showField('H2')">
      <VueTimepicker :modelValue="StartRes" @update:modelValue="updateStart"  :minuteInterval = 15 :hourRange= "DefaultHourRange" @focus="focusField('H2')" @blur="blurField"></VueTimepicker>
      </div>
      <h4>Wybierz godzinę zakończenia rezerwacjii</h4>
      <h3 v-show="!showField('H3')" @click="focusField('H3')">{{ third_timePicker}}</h3>
      <div v-show="showField('H3')">
      <VueTimepicker :modelValue="EndRes" @update:modelValue="updateEnd"  :minuteInterval = 15 :hourRange= "DefaultHourRange" @focus="focusField('H3')" @blur="blurField"></VueTimepicker>
      </div>
      <div class="button-make-reservations"  @click="handleSend()" > 
            <span>Zarezerwuj stolik </span><i class="fas fa-calendar-plus"></i>
    </div>
    </div>
    </div>
    <div  class="staff-container area" v-else>
      
      <h2>Pokaż rezerwacje w danym dniu ze względu na: </h2>
    <div class="staff-buttons">
    <div class="button-toggle-area"  @click="setStufftoshow('ShowByTime')" > 
            <span>Godzinę</span><i class="fas fa-calendar"></i>
    </div>
    <div class="button-toggle-area"  @click="setStufftoshow('ShowByDate')" > 
            <span>Datę</span><i class="fas fa-calendar"></i>
    </div>
    </div>
      <div v-show="showStuff('ShowByTime')">
        <h4>Wybierz godzinę rozpoczęcia rezerwacjii</h4>
        <h3 v-show="!showField('H2')" @click="focusField('H2')">{{ second_timePicker }}</h3>
        <div v-show="showField('H2')">
        <VueTimepicker :modelValue="StartRes" @update:modelValue="updateStart"  :minuteInterval = 15 :hourRange= "DefaultHourRange" @focus="focusField('H2')" @blur="blurField"></VueTimepicker>
        </div>
        <h4>Wybierz godzinę zakończenia rezerwacjii</h4>
        <h3 v-show="!showField('H3')" @click="focusField('H3')">{{ third_timePicker}}</h3>
        <div v-show="showField('H3')">
        <VueTimepicker :modelValue="EndRes" @update:modelValue="updateEnd"  :minuteInterval = 15 :hourRange= "DefaultHourRange" @focus="focusField('H3')" @blur="blurField"></VueTimepicker>
        </div>
      </div>
      <div v-show="showStuff('ShowByDate')" class="table">
        <div v-show="isempty">
          <h4>Brak rezerwacji na ten dzień </h4>
        </div>
        <div v-show="!isempty">
        <table>
          <tr><td></td><td>Nr Stolika</td> <td>Imie i Nazwisko </td><td>Początek</td> <td>Koniec </td></tr>
          <tr v-for="item in temp" :key="item"><td><DeleteReservation v-bind:resID = "item.resID" @response = deleteResponse /></td> <td>{{item.idStolika}}</td> <td> {{item.ReservaedBy}}</td> <td>{{item.Start.HH}}:{{item.Start.mm}}</td> <td>{{item.End.HH}}:{{item.End.mm}}</td></tr>
      
      </table>
      </div>
    
    </div>
  </div>
  </div>
</template>

<script>
import DeleteReservation from '../components/reservationitems/DeleteReservation';
import Sandbox from '../components/reservationitems/sandbox.vue';
import Datepicker from 'vue3-datepicker';
import ClientService from '../Service/ClientService.js';
import StaffService from '../Service/StaffService.js'
import VueTimepicker from 'vue3-timepicker';
import 'vue3-timepicker/dist/VueTimepicker.css';

export default {
    name: "reservation",
    data() {
      return {
        upperLimit: new Date(),
        lowerLimit: new Date(),
        time1: new Date(),
        time2: {HH: "", mm:""},
        StartRes: {HH: "08", mm:"00"},
        EndRes: {HH: "09", mm:"00"},
        reservations: [],
        reservationsDays: [],
        focusArea: false,
        activeTable: -1,
        DefaultHourRange: [8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        activeTime: -1,
        availableTables: [],
        disabledTables: [], 
        editField:'',
        show: 'ShowByTime',
        isEndTimeChosen: false,
        temp: [],
        isempty: true,
      }
    },
    components: {
      Sandbox,
      Datepicker,
      VueTimepicker,
      DeleteReservation
    },
    methods:
    {
      deleteResponse(id)
      {
        for(let i=0; i<this.temp.length; i++)
        {
          if(this.temp[i].resID == id)
          {
            this.temp.splice(i, 1);
            break;
          }
        }
        let tmp = this.reservationsDays.indexOf(this.time1.toDateString())
        for(let i=0; i < this.reservations[tmp].length; i++)
        {
          if(this.reservations[tmp][i].resID == id)
          {
            this.reservations[tmp].splice(i, 1);
            break;
          }
        }
      },
      isEmpty()
      {
        this.isempty = !(this.disabledTables.length>0)
      },
      showStuff(name)
      {
        return name == this.show
      },
      setStufftoshow(name)
      {
        if(name == 'ShowByDate')
        {
          this.StartRes = {HH: "00", mm:"00"};
          this.EndRes = {HH: "24", mm:"00"};
          this.showByDate();
        }
        else
          {
           this.StartRes = {HH: "08", mm:"00"}
           this.EndRes = {HH: "09", mm:"00"}
          }

        this.show = name;
      },
      showByDate()
      {
        let tmp = this.reservationsDays.indexOf(this.time1.toDateString());
        this.temp = []
        if(tmp != -1)
        {
          for(let i=0; i< this.reservations[tmp].length; i++)
          {
            this.temp.push( this.reservations[tmp][i])

          }
        }
      },
      isStaff()
      {
        return this.$store.getters['user/isStaff'];
      },
      getTables(tables)
      {
        this.availableTables = tables;
      },
      changeFocus()
      {
        this.focusArea =!this.focusArea;
      },
      async getTableNumber(number)
      {
        this.activeTable = number;
      },
      updateHour(time)
      { 
        this.time2 = time;
        this.StartRes = this.time2
        this.EndRes = {
          HH: this.FormatForDatetime(parseInt(this.time2.HH)+1),
          mm: this.time2.mm
        }
        this.isEndTimeChosen = false;
      },
      updateStart(time)
      { 
        this.time2 = time;
        this.StartRes = time;        
      },
      updateEnd(time)
      { 
        this.EndRes = time;
        this.isEndTimeChosen = true;
      },
      FormatForDatetime(tim)
      {
        if(tim.length===1)
        {
          return "0".concat(tim)
        }
        return tim.toString();
      },
      properMinutes(time)
      {
        let tmp = parseInt(time.mm)%15;
        let ret = {HH: 0, mm: 0}
        if(parseInt(time.mm)-tmp+15 == 60)
        {
          ret.mm = this.FormatForDatetime(0);
          ret.HH = this.FormatForDatetime(parseInt(time.HH)+1);
        }
        else
        {
          ret.mm = this.FormatForDatetime((parseInt(time.mm)-tmp+15));
          ret.HH = time.HH;
        }
        
        return ret;
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
      },
      async focusField(name){
            this.editField = name;
      },
      blurField(){
          this.editField = '';
      },
      showField(name){
          return (this.editField == name)
      },
      async handleSend()
      {

        if(this.disabledTables.includes(this.availableTables.indexOf(this.activeTable)))
        {
          //handle error
          this.handleResponse("Wybrany stolik jest zajęty", false)
        }
        else if (this.activeTable ==-1)
        {
          this.handleResponse("Nie wybrano stolika", false)
        }
        else if (this.EndRes.HH < this.StartRes.HH || (this.EndRes.HH==this.StartRes.HH && this.EndRes.mm <= this.StartRes.mm)){
          this.handleResponse("Proszę ustawić prawidłową godzinę rezerwacji", false);
        }
        else
        {
         let data = 
          {
            ReservationStart: new Date(this.time1.getFullYear(), this.time1.getMonth(), this.time1.getDate(), this.StartRes.HH, this.StartRes.mm),
            ReservationEnd: new Date(this.time1.getFullYear(), this.time1.getMonth(), this.time1.getDate(), this.EndRes.HH, this.EndRes.mm),
            TableID: this.availableTables[this.availableTables.indexOf(this.activeTable)],
            email: this.$store.getters['user/getEmail']
          }
          this.handleResponse(await ClientService.createReservation(this.$store.getters['user/getToken'],data),true);
        }
      },
      handleResponse(response, flag)
      {
        if(flag)
        {
          if(response.status=='200')
          {
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Pomyślnie zarezerwowano stolik</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
                });
          }
          else{
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Wystąpuł błąd spróbuj ponownie później</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: false,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
          }
        }
        else
        {
          this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">'+response+'</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: false,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
        }
      }
    },
    
    async created()
    {
      if(!this.$store.getters['user/getLogged'])
      {
        this.$router.push('/');
      }
      else{
      this.time2.HH = this.FormatForDatetime(this.time1.getHours().toString());
      this.time2.mm = this.FormatForDatetime(this.time1.getMinutes().toString());
      this.time2 = this.properMinutes(this.time2);
      this.upperLimit = new Date(new Date().setDate(this.upperLimit.getDate()+7));
      //data is sorted by ReservationStart
      if(this.isStaff())
      {
        let reservations = await StaffService.getReservations(this.$store.getters['user/getToken'])
        let tmp = 0;
        let temp = 0;
        let tmp2 = 0;
        //this loop is making 2 arrays of dates
        //first array (reservationsDays) holds all dates that program got from database
        //second (reservations) is 2 dim array that hilds time of reservation of table in particular day
        //second array in first dim is synced with first array - its like in python dictionary but in 2 arrays (first holds keys, and second holds values)
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
              End: {HH: this.FormatForDatetime(tmp2.getHours().toString()), mm: this.FormatForDatetime(tmp2.getMinutes().toString())},
              resID: reservations.data[i].id,
              ReservaedBy: reservations.data[i]['User.firstname']+' '+reservations.data[i]['User.lastname']         
              });
          }
          else
          {
            this.reservations[this.reservationsDays.indexOf(temp)].push(
              {idStolika: reservations.data[i].Table_fk, 
              Start: {HH: this.FormatForDatetime(tmp.getHours().toString()), mm: this.FormatForDatetime(tmp.getMinutes().toString())},
              End: {HH: this.FormatForDatetime(tmp2.getHours().toString()), mm: this.FormatForDatetime(tmp2.getMinutes().toString())} ,
              resID: reservations.data[i].id,
              ReservaedBy: reservations.data[i]['User.firstname']+' '+reservations.data[i]['User.lastname']             
              });
          }
        }
      }
      else
      {
        let reservations = await ClientService.getReservationTimes(this.$store.getters['user/getToken'])
                let tmp = 0;
        let temp = 0;
        let tmp2 = 0;
        //this loop is making 2 arrays of dates
        //first array (reservationsDays) holds all dates that program got from database
        //second (reservations) is 2 dim array that hilds time of reservation of table in particular day
        //second array in first dim is synced with first array - its like in python dictionary but in 2 arrays (first holds keys, and second holds values)
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
              End: {HH: this.FormatForDatetime(tmp2.getHours().toString()), mm: this.FormatForDatetime(tmp2.getMinutes().toString())},
              resID: reservations.data[i].id,         
              });
          }
          else
          {
            this.reservations[this.reservationsDays.indexOf(temp)].push(
              {idStolika: reservations.data[i].Table_fk, 
              Start: {HH: this.FormatForDatetime(tmp.getHours().toString()), mm: this.FormatForDatetime(tmp.getMinutes().toString())},
              End: {HH: this.FormatForDatetime(tmp2.getHours().toString()), mm: this.FormatForDatetime(tmp2.getMinutes().toString())} ,
              resID: reservations.data[i].id,           
              });
          }
        }
        
      
    }}},
    computed:
    {
      //its for showing user wich tables are reserved
      timeChangeHandler(){
        let tmp = this.reservationsDays.indexOf(this.time1.toDateString());
        this.clearTables();
        if(tmp != -1)
        {
          
          for(let i=0; i< this.reservations[tmp].length; i++)
          {
            if(this.isBetween(this.time2, this.reservations[tmp][i].Start,this.reservations[tmp][i].End) || 
            (this.isBetween(this.EndRes, this.reservations[tmp][i].Start,this.reservations[tmp][i].End)) || 
            (this.isBetween(this.reservations[tmp][i].Start, this.StartRes,this.EndRes)) || (this.isBetween(this.reservations[tmp][i].End, this.StartRes,this.EndRes)))
            {
              this.pushTable( this.availableTables.indexOf(this.reservations[tmp][i].idStolika))
            }
            
          }
        }
        this.isEmpty();
        this.showByDate();
        return this.reservationsDays.indexOf(this.time1.toDateString());
      },
      first_timePicker()
      {
        return this.time2.HH + ":"+ this.time2.mm;
      },
      second_timePicker()
      {
        return this.StartRes.HH + ":"+ this.StartRes.mm;
      },
      third_timePicker()
      {
        return this.EndRes.HH + ":"+ this.EndRes.mm;
      }

    },

}
</script>

<style scoped>
.area
{
  margin-top: 10px;
  width: 100%;
  border-top: 0.3em black solid;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
.staff-buttons
{
  display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
.staff-container
{
  padding-bottom: 10%;
}
.table{
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.reservation {
  background-color: #1b1b1b;
  color: rgb(255, 205, 124);
  width: 100%;
  margin-bottom: 10%;
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
.button-toggle-area
{
    width: 25%;
    background-color: #3b3b3b;
    color: white;
    padding: 0.5em 0.6em;
    border-radius: 10px;
    font-size: 1.2em;
    margin: 1em;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    transition: padding 0.3s, background-color 0.3s;
}
.button-toggle-area:hover
{
  cursor: pointer;
  background-color: #7b7b7b;
}
.button-toggle-area:active
{
  background-color: #5b5b5b;
  padding: 0.7em 1.6em;
}

.button-make-reservations
{
    background-color: #3b3b3b;
    color: white;
    padding: 0.5em 0.5em;
    border-radius: 10px;
    font-size: 1.2em;
    margin: 1em;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    transition: padding 0.3s, background-color 0.3s;
}
.button-make-reservations
{
  cursor: pointer;
  background-color: #7b7b7b;
}
.button-make-reservations
{
  background-color: #5b5b5b;
  padding: 0.7em 1.6em;
}
</style>
