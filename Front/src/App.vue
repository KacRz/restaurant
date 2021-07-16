<template>
  <div style="width=100%" id="app">
    <Sidebar />
    <Background/>
    <div class="MarginToSidebar" :style="{ 'margin-left': sidebarWidth }">
      <Content-Component >
        <router-view/>
      </Content-Component >
  </div>
</div>
</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'
import Background from './components/Background.vue'
import ContentComponent from './components/ContentComponent.vue'


export default {
  components: {
    Sidebar,
    Background,
    ContentComponent,
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
