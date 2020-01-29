<template>
    <el-dialog 
       :title="dialog.title ? dialog.title : '' " 
       :width="dialog.width ? dialog.width : '50%' "      
       :modal="dialog.modal ? dialog.modal : true"
       :fullscreen="dialog.fullscreen ? dialog.fullscreen : false"
       :modal-append-to-body="dialog.appendToBody ? dialog.appendToBody : true"
       :lock-scroll="dialog.localScroll ? dialog.localScroll : false"
       :close-on-click-modal="dialog.closeOnModal ? dialog.closeOnModal : true"
       :close-on-press-escape="dialog.closeOnEscape ? dialog.closeOnEscape : true"
       :center="dialog.center ? dialog.center :false"
       :visible.sync="vis"
       @close="dialog.close()"
       @closed="dialog.closed()"
       @opened="dialog.opened()"
       @open="dialog.open()">

         <slot></slot>

        <div slot="footer" class="dialog-footer">
            <el-button  size="mini" @click="vis = false,cancel()">取 消</el-button>
            <el-button  size="mini" type="primary" @click="vis = false,confirm()">确 定</el-button>
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






















