<template>
    <span >
        <el-button-group>
            <template  v-for="(btn,index) in btns">
                <slot name="header"></slot>
                <Button :btn="btn" />
                <slot name="footer"> </slot>
            </template>
        </el-button-group>   
    </span>             
</template>
<script>
import Button from './Button';
 export default {
    props:{
        btns:{
            type:Array,
            required:false
        },
    },
    components:{
        Button,
    }
 }


</script>
<style scoped>




</style>






























