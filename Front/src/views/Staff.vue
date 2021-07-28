<template>
    <div class="staff">
        <ul class="staff-list">

            <li v-for="person in staff.data" :key="person.id">
                <PersonPanel v-bind="person" @delete= deletePerson /></li>
                <AddStaffComponent />         
            </ul>    


    </div>
</template>

<script>
import ManagerService from '../Service/ManagerService'
import PersonPanel from  '../components/StaffItems/PersonPanel.vue'
import AddStaffComponent from '../components/StaffItems/AddStaffComponent.vue'
export default {
    name:"Staff",
    components: {
        PersonPanel,
        AddStaffComponent,
    },
    data(){
        return {staff:[]};
    },
    async created(){
        if(!this.$store.getters['user/isManager'])
            this.$router.push("/");
        else{

            this.staff = await ManagerService.getStaff(this.$store.getters['user/getToken']);
            await this.staff.data.splice(this.searchEmailInData(this.$store.getters['user/getEmail']),1)
        }
    },
    methods:
    {
        async deletePerson(id)
        {
            
            let tmp =this.searchidInData(id);
            if( tmp != -1 )
            {
                /*
                let mess = Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                    denyButtonText: `Don't save`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire('Saved!', '', 'success')
                            return true;
                        } 
                        else if (result.isDenied) 
                        {
                            Swal.fire('Changes are not saved', '', 'info')
                            return false;
                        }
                    })
                    
                if(mess)
                {
                    //ManagerService.delStaff(this.staff[tmp].id);
                    this.staff.data.splice(tmp,1);
                }*/
                await ManagerService.delStaff(this.$store.getters['user/getToken'],this.staff.data[tmp].id);
                this.staff.data.splice(tmp,1);
            }
                        
        },
        searchidInData(id)
        {
            
            for(let i = 0; i < this.staff.data.length; i++)
            {
                if(id == this.staff.data[i].id)
                {
                    return i;
                }
            }
                return -1;
              
        },
        searchEmailInData(email)
        {
            for(let i = 0; i < this.staff.data.length; i++)
            {
                if(email == this.staff.data[i].email)
                {
                    return i;
                }
            }
                return -1;

        }
        
    }


}
</script>

<style scoped>
.staff
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}
.staf-list
{
    margin:0;
}
ul
{
    padding: 0;
    margin:0;
}
</style>