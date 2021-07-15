<template>
    <div>
        <ul style="list-style: none;">
        <li id="conctact"  v-for="contact in contacts" v-bind:key ="contact.value">
            {{ contact.contact }}
        </li>
     </ul>
    </div>
</template>

<script>
export default {
el: '#contact',
name: 'ContactToOrder',
data:function(){
    return{
        contacts: [{contact: '111 111 111'},{contact: '22 222 22 22'}]}

    
    }
}

</script>

<style>

</style>