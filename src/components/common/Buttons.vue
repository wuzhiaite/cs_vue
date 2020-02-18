<template>
    <span>
        <el-button v-for="(btn,index) in btns"  
                :type="btn.type ? btn.type : 'primary'" 
                :icon=" btn.icon ? btn.icon : '' " 
                :disabled="btn.disabled ? btn.disabled : false"
                @click="btn.click?btn.click() : null"
                :size="btn.size ? btn.size : 'mini'"
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






























