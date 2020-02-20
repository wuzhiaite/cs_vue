<template>
    <el-popover
        :placement=" popover.placement ? popover.placement : 'top' "
        :width="popover.width ? popver.width : '160' "
        :trigger="popover.trigger ? popover.trigger : 'click' "
        :title="popover.title ? popover.title : '' "
        :disabled="popover.disabled ? popover.disabled : false "
        :open-delay="popover.trigger == 'hover' && popover.openDelay ? popover.opendDelay : 0 "
        :close-delay="popover.trigger == 'hover' && popover.closDelay ? popover.closeDelay : 0 "
        :tabindex="popover.tabindex ? popover.tabindex : 0"
        v-model="vis">
        <slot></slot>
       
        <el-button icon="popver.icon" slot="reference">{{popver.name ? popover.name : '' }}</el-button>
    </el-popover>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props:{
        popover:{
            default:{},
            type:Object,
            required:false,
        },
        visiable:{
            default:false,
            type:Boolean,
            required:false,
        }
    },
    data:function(){
        return {
           vis:false,  
        }
    },
    watch:{
        visable:function(){
            this.vis = this.visable ;
        },
        vis : function(){
            this.$emit('update:visable',this.vis);
        },
    },
    methods:{

    }
    
}
</script>
<style scoped>




</style>






















