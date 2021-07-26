<template>
  <div class="add-staff">
    <div class="add-staff-button" v-on:click="staffRegister">
        <i class="fas fa-user-plus" style="font-size:2.5em"></i>
    </div>
  </div>
</template>

<script>
export default {
    name:"addStaffComponent",
    data()
    {
      return {}
    },
    methods:
    {
      staffRegister()
      {
        this.$router.push("/register");
      }
    }

}
</script>

<style>
.add-staff
{
   margin-top: 0.5em;
   margin-left: 0.5em;
  display: flex;
}
.add-staff-button
{
  border-right: 3px solid black;
  border-bottom: 3px solid black;
  border-radius: 3px;
  border-color: black;
  color:rgb(255, 205, 124);
  background-color: #1b1b1b;
}
.add-staff-button:hover{
  border-right: 3px solid black;
  border-bottom: 3px solid black;
  border-radius: 3px;
  border-color: black;
  color:rgb(247, 162, 25);
  background-color: #1b1b1b;
}
.add-staff-button:active{
  border-right: 3px solid black;
  border-bottom: 3px solid black;
  border-radius: 3px;
  border-color: black;
  color:rgba(153, 150, 145,255);
  background-color: #1b1b1b;
}
</style>