<template>
  <div class="home" style="display: block">
    <h1 class="Rest_Name">{{Logo}}</h1>
    <br>
    <div class="miniAbout">
      <ContactToOrder />
      <Localization/>
      <TimeTable />
      <Reservations />

    </div>
    <h2 class = "Bas_menu">{{Basic_menu}} </h2> 
    
    
  </div>
</template>

<script>
//import Homeitem from '@/components/homeitem/Homeitem.vue'
// @ is an alias to /src
import ContactToOrder from '@/components/About/ContactToOrder.vue'
import Localization from '@/components/About/Localization.vue'
import TimeTable from '@/components/About/TimeTable.vue'
import Reservations from '@/components/About/Reservations.vue'
export default {
  name: 'Home',
  components: {
    ContactToOrder,
    Localization ,
    TimeTable,
    Reservations,
  },
data: function()
{
  return {
    Logo:'Qwant',
    Address: 'Adress',
    Basic_menu: 'CosTamCosTam'
    }
}
}
</script>
<style >
:root
{
  --background-transparent-color: rgba(231, 95, 16, 0.5);
}
</style>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-transparent-color);
}

.homeitems {
  margin: 0.3em;
}
.miniAbout
{

  width: 100%;
  display: flex;
  background-color: chocolate;
  justify-content: center;
  align-items: center;
}
</style>