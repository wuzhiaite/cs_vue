<template>
<div style="height:100%;">
<el-row :gutter="24" style="height:100%;">
<el-col :span="10">
    <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>菜单列表</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="remove()">删除</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right:5px;" type="text" @click="append()">新增</el-button>
        </div>
        <el-tree
            :data="data"
            node-key="id"
            draggable
            default-expand-all
            current-node-key
            :expand-on-click-node="false"
            @node-click="changeCurrent">
        </el-tree>
    </el-card>
</el-col>
<!-- 菜单表单 -->
<el-col :span="13" :offset="1">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>菜单列表</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="remove()">删除</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right:5px;" type="text" @click="append()">新增</el-button>
        </div>
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            draggable
            default-expand-all
            current-node-key
            :expand-on-click-node="false"
            @node-click="changeCurrent">
        </el-tree>
    </el-card>
</el-col>
</el-row>  
</div>
</template>
<script>
export default {
    data() {
      return {
        data: [],
        currentData:{},
        currentNode:{}
      }
    },
 created(){
    var data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          },{
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
   var temp = {
     id:9999,
     label:'CS系统',
     children:data,
   }
  this.data = [temp] ;
 },
 methods: {
      append() {
        var data = this.currentData ;
        var id = data.id ;
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove() {
        var node = this.currentNode ; 
        var data = this.currentData ;
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      changeCurrent(data,node){
          this.currentData = data ;
          this.currentNode = node ;
      }

    }

}
</script>
<style scoped>
  .el-row .el-col {
      height:100%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    height:100%;
  }
</style>