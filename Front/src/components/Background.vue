<template>
<div class="banner">
    
   <img src="@/assets/backgroun.jpg" alt="" >
</div>
</template>
<script>

export default {
name: "Background"
}
</script>
<style scoped>

.banner
{
    color: white;
    background-color: var(--sidebar-bg-color);

    /*box-sizing: border-box; */
    float: top;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    bottom: 0;
    transition: 0.3s ease;

}
</style>