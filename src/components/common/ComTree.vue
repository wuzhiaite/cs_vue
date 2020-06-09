<template>
<div class="tree-area">
    <el-tree
            :data="treeData"
            ref="tree"
            :show-checkbox="item.showCheckBox ? item.showCheckBox  : false"
            :node-key="item.key ? item.key : 'id' "
            :default-expand-all="item.expandAll ? item.expandAll : true "
            :expand-on-click-node="item.expandOnClickNode ? item.expandOnClickNode : false"
            :render-content="item.renderContent ? item.renderContent : null "
            :default-expanded-keys="item.defaultExpandedKeys ? item.defaultExpandedKeys : [] "
            :default-checked-keys="item.defaultCheckedKeys ? item.defaultCheckedKeys : [] "
            @check="threeCheck"
    ></el-tree>
</div>
</template>
<script>
export default{
      data(){
          return {
              treeData:[],
              defaultProps: {
                  children: 'children',
                  label: 'label'
              }
          }
      },
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
      created(){
          if(this.item.url) {
              this.getData();
          }else{
              this.treeData = this.item.treeData ;
          }
      },
     methods:{
         threeCheck(checkedNodes,checkedKeys,halfCheckedNodes,halfCheckedKeys ) {
             console.log(this.$refs.tree.getCheckedKeys());
         },
        getData(){
            var url = this.item.url;
            var param = this.item.params ? this.item.params : {} ;
            if(!url){return null; }
            this.$axios
                .post(url,param)
                .then(res => {
                    if(res.status == 200 && res.data.code == 1){
                        this.treeData = res.data.result;
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
.tree-area{
    border:1px solid #DCDFE6;
    padding:10px;
    border-radius:7px;

}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}


</style>