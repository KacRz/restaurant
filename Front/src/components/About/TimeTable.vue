<template>
    <div>
      <ul style="list-style: none;">
        <li id="timetable"  v-for="day in timetables" v-bind:key ="day.days">
            {{ day.days}} : {{day.hours}}
        </li>
     </ul>
    </div>
</template>

<script>
export default {
name: "TimeTable",
data: function()
{
    return{
        timetables:
        [
            {days: 'pon-czw', hours: '9:00 - 21:37'},
            {days: 'pt', hours: '9:00 - 20:37'},
            {days: 'sob-nie', hours: '14:00 - 21:37'}
        ]
        
    }
}
}
</script>

<style>

</style>