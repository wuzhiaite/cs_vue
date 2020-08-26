<template>
    <el-select
               v-model="form[item.prop]"
               size="mini"
               filterable
               :allow-create=" item.allowCreate ? item.allowCreate : false "
               :disabled="item.disabled ? item.disabled : false"
               :multiple = " item.multiple ? item.multiple : false "
               @change=" item.events && item.events.changeSelect ? item.events.changeSelect() : null "
               :placeholder="item.placeholder ? item.placeholder : '请选择' ">
        <el-option  v-for="opt in  options" :label="opt.label" :value="opt.value"/>
    </el-select>
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
              if(n && n != o){
                  if(n.url){
                      this.getOptions();
                  }else{
                      if(this.item.options && this.item.options.length>0){
                          this.options = this.item.options ;
                          this.$forceUpdate();
                      }
                  }
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
                        this.options = res.data.result;
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
<style scoped>

</style>




