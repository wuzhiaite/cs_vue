<template>
<el-checkbox-group
    style="float:left;"
    v-model="form[item.prop]"
    size="mini">
      <span v-if="item.events&&item.events.addClick" style="margin:0px;">
          <el-button type="primary"
                     size="mini"
                     style="float:left;margin:0px;"
                     icon="el-icon-plus"
                     @click="item.events.addClick()" plain ></el-button>
      </span>
    <el-checkbox
            v-if="item.type=='checkbox'"
            size="mini"
            style="margin:0px; "
            :disabled="item.disabled ? item.disabled : false"
            v-for="opt in options"
            :label="opt.value" :key="opt.value">{{opt.label}}</el-checkbox>
    <el-checkbox-button
            v-if="item.type=='checkbox-button'"
            size="mini"
            style="margin:0px; "
            v-for="opt in options"
            :label="opt.value" :key="opt.value">
                <span  @click="item.events && item.events.click ? item.events.click(opt) : null">
                  {{opt.label}}
                </span>
    </el-checkbox-button>
</el-checkbox-group>


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
        watch:{
           item:{
               deep:true,
               immediate:true,
               handler(n,o){
                   console.log(this.item);
                   if( this.item.url ){
                       this.getOptions();
                   }else{
                       this.options = this.item.options ;
                   }
               }
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
                            var options = res.data.result;
                            this.options = options;
                            console.log(this.options);
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






