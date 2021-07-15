<template>
    <div class = "Content" :style="{'width': widt, 'margin-left':  leftMargin }">
        <slot></slot>
    </div>
</template>


<script>
import { sidebarWidth } from './sidebar/state'

export default{

data: function() {
    return {
      // Initialized to zero to begin
        widt:  (window.innerWidth - (parseInt((sidebarWidth.value).replace(/px$/, ''))+50)).toString()+'px',
        leftMargin: '25px',
        
    }
},
methods:
{
    resize: function(){
        return 10;
    }
},
mounted() {
  window.addEventListener("resize", ()=>{
       this.$data.widt = (window.innerWidth - (parseInt((sidebarWidth.value).replace(/px$/, ''))+50)).toString()+'px';
       
   });
},
unmounted() {
    
    
   
  window.removeEventListener("resize", ()=>{
       this.$data.widt = (window.innerWidth - (parseInt((sidebarWidth.value).replace(/px$/, ''))+50)).toString()+'px';       
   });
}
}

</script>
<style scoped>
.Content{
    color: black;
}

</style>