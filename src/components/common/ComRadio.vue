<template>
    <el-radio-group
            size="mini"
            v-model="form[item.prop]" >
        <el-radio v-if="item.type=='radio'"
                  :border="item.border ? item.border : false"
                  size="mini"
                  :disabled="item.disabled ? item.disabled : false"
                  v-for="opt in options"
                  :label="opt.value">{{opt.label}}</el-radio>

        <el-radio-button v-if=" item.type == 'radio-button' "
                         size="mini"
                         :disabled="item.disabled ? item.disabled : false"
                         v-for="opt in options"
                         :label="opt.value" >{{ opt.label }}</el-radio-button>
    </el-radio-group>
</template>
<script>

export default {
    props:{
        item :{
            required:true,
            type:Object,
        },
        form:{
            required:true,
            type:Object,
        }
    },
    data(){
        return {
            options:[]
        }
    },
    created(){
        if(!this.item.options){
            this.getOptions();
        }else{
            this.options = this.item.options ;
        }
    },
    methods:{
        getOptions(){
            var url = this.item.url;
            var param = this.item.params ;
            if(!url){return null; }
            this.$axios
                .post(url,param)
                .then(res => {
                    if(res.status == 200 && res.data.code == 1){
                        const options = res.data.result;
                        this.options = options;
                    }else{
                        this.$message({
                            type:"error",
                            message:'数据查询失败，请稍后重试！！！'
                        });
                    }
                });
        }
    }
}
</script>
<style>

</style>










