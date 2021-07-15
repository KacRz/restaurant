<template>
    <div>
      <ul style="list-style: none;">
        <li >
            {{ temp }} 
        </li>
        <li >
            {{street}} 
        </li>
        <li >
            {{ city}} 
        </li>
     </ul>
  </div>
</template>

<script>
export default {
name: "Localization",
data: function()
{
return {city: 'Rzeszów', street: 'Wincentego Pola 34', temp: 'Qwant'}



}

}
</script>

<style>

</style>