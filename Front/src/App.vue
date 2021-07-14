<template>
  <div id="app">
    <Sidebar />

    <div :style=" { 'margin-left': sidebarWidth } ">
      <router-view/>
    </div>
  </div>
</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'
//import Header from './components/Header.vue'

export default {
  components: {
    Sidebar,
  },
    setup() {
    return { sidebarWidth }
  }
}
</script>


<style>
body, html
{

  width:100%;
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
  
}

.MarginToSidebar
{
  height: 100%;
}
</style>
