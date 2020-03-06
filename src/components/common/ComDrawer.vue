<template>
 <el-drawer
    :title="drawer.title ? drawer.title : '' "
    :before-close="handleClose"
    :visible.sync="vis"
    :direction=" drawer.direction ? drawer.direction : 'ltr' "
    ref="drawer"
    :size = "drawer.size ? drawer.size :'50%' ">
        <slot></slot>
 </el-drawer>
</template>
<script>
export default {
    props:{
        drawer:{
            required:true,
            default:{},
            type:Object
        },
        visable:{
            type:Boolean,
            default:false,
        },
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
    methods:{
         handleClose(done) {//关闭之前进行的操作
            if (this.loading) {
                return;
            }
            this.$confirm('确定关闭页面')
                .then(_ => {
                this.loading = true;
                this.timer = setTimeout(() => {
                    done();
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                    this.loading = false;
                    }, 400);
                }, 2000);
            }).catch(_ => {});
            if(this.drawer.handleClose){
               this.drawer.handleClose(); 
            }
         },
    }
}
</script>
<style scoped>

</style>