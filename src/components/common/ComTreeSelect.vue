<template>
    <treeselect
            :name="item.prop"
            :dir="item.dir ? item.dir  : 'ltr'"
            :multiple="item.multiple"
            :clearable="item.clearable ? item.clearable : true"
            :searchable="item.searchable ? item.searchable  : true"
            :disabled="item.disabled ? item.disabled : false"
            :open-on-click="item.events && item.events.openOnClick ? item.events.openOnClick  : null "
            :open-on-focus="item.events && item.events.openOnFocus ? item.events.openOnFocus : null"
            :clear-on-select="item.events && item.events.clearOnSelect ? item.events.clearOnSelect : null "
            :close-on-select="item.events && item.events.closeOnSelect ? item.events.closeOnSelect : null  "
            :always-open="item.alwaysOpen ? item.alwaysOpen : false"
            :default-expand-level="item.defaultExpandLevel ? item.defaultExpandLevel : 1"
            :append-to-body="item.events && item.events.appendToBody ? item.events.appendToBody : null  "
            :options="item.options ? item.options : options"
            :placeholder="item.placeholder ? item.placeholder : ''"
            :limit="item.limit ? item.limit : 3"
            :max-height="item.maxHeight ? item.maxHeight : 200"
            v-model="form[item.prop]"
    />
</template>
<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

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
    components:{
        Treeselect
    },
    created(){
        if(!this.item.options){
            this.getOptions();
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












