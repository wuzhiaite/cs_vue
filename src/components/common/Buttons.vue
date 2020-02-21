<template>
    <span >
        <template v-for="(btn,index) in btns">
            <slot name="header"></slot>
            <el-button   
                :type="btn.type ? btn.type : 'primary'" 
                :icon=" btn.icon ? btn.icon : '' " 
                :disabled="btn.disabled ? btn.disabled : false"
                @click="btn.click ? btn.click() : null"
                @hover="btn.hover ? btn.hover() : null "
                :size="btn.size ? btn.size : 'mini'"
                :circle="btn.style && btn.style.indexOf('circle') != -1 ? true : false"
                :plain="btn.style && btn.style.indexOf('plain') != -1  ? true : false"
                :round="btn.style && btn.style.indexOf('round') != -1  ? true : false"
                >{{btn.name}}
            </el-button>
            <slot name="footer"> </slot>
        </template>
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






























