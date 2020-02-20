<template>
    <span>
        <el-button v-for="(btn,index) in btns"  
                :type="btn.type ? btn.type : 'primary'" 
                :icon=" btn.icon ? btn.icon : '' " 
                :disabled="btn.disabled ? btn.disabled : false"
                @click="btn.click ? btn.click() : null"
                @hover="btn.hover ? btn.hover() : null "
                :size="btn.size ? btn.size : 'mini'"
                :circle="btn.style && btn.style == 'circle' ? true : false"
                :plain="btn.style && btn.style == 'plain' ? true : false"
                :round="btn.style && btn.style == 'round' ? true : false"
                >{{btn.name}}</el-button>
    </span>             
</template>
<script>

 export default {
    props:{
        btns:{
            type:Array
        }
    },
 }


</script>
<style scoped>




</style>






























