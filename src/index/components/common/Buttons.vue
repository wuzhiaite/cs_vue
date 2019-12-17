<template>
    <el-row>
        <el-button v-for="(btn,index) in btns"  
                :type="btn.type ? btn.type : 'primary'" 
                :icon=" btn.icon ? btn.icon : '' " 
                :disabled="btn.disabled ? btn.disabled : false"
                @click="btn.click"
                :size="btn.size ? btn.size : 'mini'"
                >{{btn.name}}</el-button>
    </el-row>             
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






























