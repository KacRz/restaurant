<template>
  <div class="PersonPanel">
      <div class="PersonPanel-top">
        <h4 class="PersonPanel-content"> 
            {{ id }}
        
            {{ firstname }}
        
            {{ lastname }}
        
           {{ email }}
        
            {{ UserType_fk }}
        </h4>
      </div>
    <div class="delete-staff-button" v-on:click="deleteStaff(id)">
        <i class="far fa-times-circle" style="font-size:2.5em"></i>
    </div>
  </div>
</template>

<script>
export default {
    name: "Fooditem",
    props: {
        id: { type: Number, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        UserType_fk: { type: Number, required: true },
    },
    methods:
    {
        deleteStaff(id)
        {
            
            //ManagerService.delStaff(this.$store.state.user.token,this.$props.id);
            this.$emit('delete', id)
        }
    }
}
</script>

<style scoped>


.PersonPanel {

    
    background-color: #1b1b1b;

    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    border-right: 3px solid black;
    border-bottom: 3px solid black;
    border-radius: 3px;
    position: relative;
    overflow: hidden;

}

.fPersonPanel-top {
    height: 5%;

    overflow: hidden;
    position: relative;
}

.PersonPanel-content {
    height: 5%;
    background-color: #1b1b1b;
    color: rgb(255, 205, 124);

    display: flex;
    flex-direction: column;
    padding: 0.5em;
}
.PersonPanel-content > h4 {
    text-align: left;
    padding: 0.3em;
    margin: 0;

    border-bottom: 1px solid rgb(255, 205, 124);;
}
.delete-staff-button
{
    margin-bottom: auto;
    position: absolute;
    left: 10px;
    top: 25%;
    display: flex;
    flex-direction: row;
}
.delete-staff-button:hover
{
    margin-left: auto;
    display: flex;
    flex-direction: row;
    color: rgb(247, 162, 25)
}
.delete-staff-button:active
{
   margin-left: auto;
    display: flex;
    flex-direction: row;
     color: rgb(255, 220, 163)
}

</style>