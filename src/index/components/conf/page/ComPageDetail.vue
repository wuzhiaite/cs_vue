<template>
        <el-form 
            label-position="right"
            :model="form">
            <el-form-item label="活动名称" :label-width="formWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
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
            formWidth: '120px',
            vis:false,
            form:{},
                 
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
            console.log(this.width);
            this.formWidth = this.width * 0.5 +'px';
        }
    },
    computed:{
        ...mapGetters({width:'getScreenWidth',
                       height:'getScreenHeight',}),
    },
    created:function(){
        this.formWidth = this.width * 0.5 + 'px';
    },
    methods:{


    }
    
}
</script>
<style scoped>
.el-select{
    width:100%;
}
</style>






















