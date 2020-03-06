<template>
    <el-dialog 
       :title="dialog.title ? dialog.title : '' " 
       :width="dialog.width ? dialog.width : '50%' "      
       :modal="dialog.modal ? dialog.modal : true"
       :fullscreen="dialog.fullscreen ? dialog.fullscreen : false"
       :modal-append-to-body="dialog.appendToBody ? dialog.appendToBody : false"
       :lock-scroll="dialog.localScroll ? dialog.localScroll : false"
       :close-on-click-modal="dialog.closeOnModal ? dialog.closeOnModal : true"
       :close-on-press-escape="dialog.closeOnEscape ? dialog.closeOnEscape : true"
       :center="dialog.center ? dialog.center :false"
       :visible.sync="vis"
       @close="dialog.events && dialog.events.close ? dialog.events.close() : null"
       @closed="dialog.events && dialog.events.closed ? dialog.events.closed() : null"
       @opened="dialog.events && dialog.events.opened ? dialog.events.opened() : null"
       @open="dialog.events && dialog.events.open ? dialog.events.open() : null">
       <div slot="title" v-if="dialog.titleSlot" v-html="dialog.titleSlot">
           
       </div>
         <slot></slot>
        <div slot="footer" class="dialog-footer" 
                style="text-align:center;"
                v-if="dialog.btns && dialog.btns.length > 0">
            <el-button v-for="(btn,index) in dialog.btns"  
                :type="btn.type ? btn.type : 'primary'" 
                :icon=" btn.icon ? btn.icon : '' " 
                :disabled="btn.disabled ? btn.disabled : false"
                @click="btn.closed ? vis=btn.closed : vis=false ,btn.click ? btn.click() : null"
                :size="btn.size ? btn.size : 'mini'"
                >{{btn.name}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props:{
        visable:{
            type:Boolean,
            default:false,
        },
        dialog:{
            default:{},
            type:Object,
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
        formWidth : function(){
            this.formWidth = this.width * 0.5 +'px';
        }
    },
    computed:{
        ...mapGetters({width:'getScreenWidth',
                       height:'getScreenHeight',}),
    },
    methods:{
        confirm:function(){
            this.dialog.confirm();
        },
        cancel:function(){
            this.dialog.cancel();
        }

    }
    
}
</script>
<style scoped>
.el-select{
    width:100%;
}
</style>






















