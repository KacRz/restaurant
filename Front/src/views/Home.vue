<template>
  <div class="home">
      <div class="home-about">
        <div class="row">
          <Homeinfo icon="fas fa-phone" :content="phoneslist" />
          <Homeinfo icon="fas fa-car-side" :content="location" />
          <Homeinfo icon="fas fa-calendar-alt" :content="timetable" />
        </div>
      </div>
      <div class="home-content">
        <div class="row content">
          <Homeitem name="Menu" to="/menu" imgsource="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=701&q=80"></Homeitem>
          <Homeitem name="Rezerwacja stolika" to="/reservation" imgsource="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></Homeitem>
        </div>
      </div>
    
  </div>
</template>

<script>
import Homeitem from '@/components/homeitem/Homeitem.vue'
import Homeinfo from '@/components/homeitem/Homeinfo.vue'

export default {
  name: 'Home',
  components: {
    Homeitem,
    Homeinfo
  },
data() {
  return {
    phoneslist: [ "17 11 11 111", "333 333 333" ],
    location: [ "Restauracja", "Dąbrowskiego 99", "Rzeszów" ],
    timetable: ["pn-pt", "9:00-22:00", "sb-nd", "10:00-23:00" ],
    }
  }
}
</script>

<style scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: block;

  color: white;
}

.home-title {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.home-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.row {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.content {
  height: 300px;
}

@media (max-width: 880px) {
  .row {
    flex-direction: column;
  }

  .home {
    font-size: 0.8em;
  }
}

</style>