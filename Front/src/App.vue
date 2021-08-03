<template>
  <div id="app">
    <Navbar />
    <router-view style="margin-top: 130px"/>
  </div> 
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'


export default {
  components: {
    Navbar
  },
    setup() {
    return { 

    }
    
  },
  data() {
        return {
          }
},

}
</script>


<style>
body, html
{
  width: 100%;
  margin: 0;
  padding: 0;

  background: 
    url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100%;
  margin: 0;
  padding: 0;

}

</style>
