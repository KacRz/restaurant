<template>
  <div class="delete-reservation">
    <div class="delete-reservation-button" v-on:click="delReservation()">
        <i class="fas fa-calendar-times" style="font-size:1.5em"></i>
    </div>
  </div>
</template>

<script>
import ClientService from '../../Service/ClientService'
export default {
    props:{
        resID: { type: Number, required: true}
    },
    data()
    {
      return {
          id: this.$props.resID,
      }
    },
    methods:
    {
      delReservation()
      {
        //make error handler
        this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Czy napewno chcesz usunąć tą rezerwację?</h3></center>',
                    position: 'center',
                    background: '#1b1b1b',
                    showCancelButton: true,
                    width: '32rem',
                    icon: 'warning',
                    confirmButtonText: 'Tak',
                    cancelButtonText: 'Nie',
                    confirmButtonColor: 'green',
                    cancelButtonColor: 'red'
        }).then((async result => {
          if (result.isConfirmed) {
          let tmp = ClientService.deleteReservation(this.$store.getters['user/getToken'], this.id);
          console.log(tmp)
          if (tmp.Status == 400) {
                  this.$swal({
                      html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">'+tmp.Error+'</h3></center>',
                      timer: 1500,
                      timerProgressBar: true,
                      toast: true,
                      position: 'top-end',
                      background: '#1b1b1b',
                      showConfirmButton: false,
                      width: '20rem',
                      icon: 'error'
                  });
              }
          else
          {
            this.$swal({
                html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Udało się usunąć rezerwację</h3></center>',
                timer: 1500,
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                background: '#1b1b1b',
                showConfirmButton: false,
                width: '20rem',
                icon: 'success'
            });
            this.$emit('response', this.id);
          }
         }
       }))
    }
}}
</script>

<style scoped>
.delete-reservation
{
   margin-top: 0.5em;
   margin-left: 0.5em;
  display: flex;
}
.delete-reservation-button
{

  color:rgb(255, 205, 124);
  background-color: #1b1b1b;
}
.delete-reservation-button:hover{
  color:rgb(247, 162, 25);
  background-color: #1b1b1b;
}
.delete-reservation-button:active{
  color:rgba(153, 150, 145,255);
  background-color: #1b1b1b;
}
</style> 