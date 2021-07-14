<template>
  <Sidebar />
<div class="MarginToSidebar" :style="{ 'margin-left': sidebarWidth }">
<Header style="width: 100%" />
<div style="margin-left: 15px">
  Chleb – pieczywo otrzymywane z wypieku ciasta, będącego jednorodnym połączeniem mąki zbożowej różnego gatunku i wody, poddanego najczęściej, 
  ale nie zawsze, fermentacji alkoholowej (z wykorzystaniem drożdży), wyrobionego w bochny różnego kształtu i wielkości. Oprócz chleba pulchnego, 
  wyrabianego z ciasta drożdżowego lub ciasta z dodatkiem proszku do pieczenia (kwaśny węglan sodu), znane są też odmiany chleba opartego na niespulchnianym cieście kruchym.

Chleb znany w starożytności nie przypominał współczesnego pulchnego wypieku, raczej zbliżony był do podpłomyka, znanej obecnie macy 
lub cienkiego podkładu pod pizzę. Taki chleb łatwiej było łamać niż kroić i zapewne stąd wziął się powszechnie znany w wielu kulturach 
zwyczaj obrzędowego łamania chlebem. Zwyczaj łamania, a nie krojenia chleba, utrzymał się zresztą do dzisiaj w kulturze śródziemnomorskiej (m.in. we Francji).

Słowo chleb jest prawdopodobnie pochodzenia praindoeuropejskiego, występuje w językach słowiańskich, pragermańskich i sanskrycie[1].

Wedle innej wersji chleb jest zapożyczeniem z języka starogermańskiego – hlaiba, starogockie hlaifs, staroislandzkie hleifr[2].

Według szacunków Instytutu Polskie Pieczywo w 2015 r. statystyczny Polak zjadł 45,3 kg pieczywa, czyli o 2,5 kg mniej niż rok 
wcześniej[3] (2014 – 47,8 kg, 2010 – 56,7 kg, 2009 – 59 kg, 2008 – 61 kg). Tymczasem jeszcze w 1981 przeciętny mieszkaniec tego 
kraju spożywał ok. 100 kg chleba, a w początkach XXI wieku – około 80 kg[4]. 
</div>
</div>

  <div :style=" { 'margin-left': sidebarWidth } ">
    <router-view/>
  </div>

</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'
import Header from './components/Header.vue'

export default {
  components: {
    Sidebar,
    Header,
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
