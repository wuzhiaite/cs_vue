<template>
<div style="height:100%;">
<el-row :gutter="24" style="height:100%;">
<el-col :span="8">
    <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <Buttons style="float:right;" :btns="btns" />
        </div>
        <el-tree
            :data="menus"
            show-checkbox
            node-key="id"
            draggable
            default-expand-all
            current-node-key
            :expand-on-click-node="false"
            @node-drag-end="handleDragEnd"
            @node-click="changeCurrent">
        </el-tree>
    </el-card>
</el-col>
<!-- 菜单表单 -->
<el-col :span="15" :offset="1">
    <el-card class="box-card" style="overflow-y:auto;">
        <Menu :form.sync="form"
              ref="form"
              :disabled="disabled" />
    </el-card>
</el-col>
</el-row>  
</div>
</template>
<script>

import Menu from './Menu';

export default {
    data() {
      return {
        menus: [],
        currentData:{},
        currentNode:{},
        form:{},
        disabled:true,
        moveTempt:{},

      }
    },
 created(){
   this.getMenuList();
   this.initBtns();
  },
  components:{
     Menu,
  },
  watch:{
      form:{
        deep:true,
        immediate:true,
        handler:function(n,o){
          var data = this.currentData;
          if(data.children){
            var children = data.children ; 
            var index = lodash.findIndex(children, function(o) { return o.id == n.id ; });
            if(index != -1){
                children[index] = n ;
                this.$set(children[index],n);
            }
          }
          
        }
      }
    },
 methods: {
     handleDragEnd(draggingNode, dropNode, dropType, ev) {
         if(dropType == 'before' || dropType == 'after'){
             draggingNode.data.fatherId = dropNode.data.fatherId ;
         }else if (dropType == 'inner'){
             draggingNode.data.fatherId = dropNode.data.id ;
         }
     },
   initBtns : function(){
      var that = this ;
      this.btns = [
        {
          name:'删除',
          type:'primary',
          click:function(){
            that.remove();
          }
        },
        {
          name:'新增',
          type:'primary',
          click:function(){
            that.append();
          }
        },{
          name:'保存',
          type:'primary',
          click:function(){
            that.save();
          }
        }
      ];  
    },
    save(){
      var menus = this.menus[0].children ;
      var tempArr = [] ;
      this.updateMenus(menus,tempArr);
      this.$axios
          .post("/api/sys/menus/batchAddOrUpdate",tempArr)
          .then(res => {
              if(res.status == 200 && res.data.code == 1){
                  var menus = this.menus[0].children ;
                  this.$store.dispatch("cs/setMenusAction",menus);
                  this.$refs.form.doSave();//调用表单中的保存按钮
                  //  this.$message({
                  //   type:"success",
                  //   message:"保存成功"
                  // });
              }else{
                this.$message({
                  type:"error",
                  message:res.data.message
                });
              }
          });
    },
    updateMenus(menus,tempArr){ //对菜单顺序进行排序
        for(var i in menus){
          var tempObj = {};
          var id = menus[i].id ;
          var fatherId = menus[i].fatherId ;
          tempObj.id = id ;
          tempObj.fatherId = fatherId ;
          tempObj.orderBy = tempArr.length + 1;
          tempArr.push(tempObj);
          var children = menus[i].children ;
          if(children && children.length > 0){
              this.updateMenus(children,tempArr);
          }
        }
    },
    getMenuList(){
      this.$axios
          .post("/api/sys/menus/getList")
          .then(res => {
              if(res.status == 200 && res.data.code == 1){
                    var csMenus = res.data.result ;
                    this.menus = csMenus;
                    this.form = csMenus[0] ;
              }else{
                this.$message({
                  type:"error",
                  message:'查询失败，请稍后重试！！！'
                });
              }
          });
    },   
    append() {
        var data = this.currentData ;
        var newChild = { 
            id: this.uuid(),
            label: '', 
            fatherId : data.id, 
            hidden : 1,
            isvalidate : 1,
            iskeepalive: 1,
            children: [] } ;
        if(data.id == 'root' ){
            newChild.path = '/home';
            newChild.realPath = 'Home';
        }
        if (!data.children) {
          this.$set(data, 'children', []) ;
        }
        data.children.push(newChild) ;
        this.disabled = false ;
        this.form = newChild ;
    },
    remove() {
      this.$confirm("是否确定删除此菜单？","提示",{
         confirmButtonText:"确定删除"
      }).then(()=>{
          var node = this.currentNode ; 
          var data = this.currentData ;
          var parent = node.parent;
          var children = parent.data.children || parent.data;
          var id = data.id ;
          var index = children.findIndex(d => d.id === id);
          children.splice(index, 1);
          this.form = this.temp;
          this.$axios
              .post("/api/sys/menus/removeById/"+id )
              .then(res => {
                  if(res.status == 200 && res.data.code == 1){
                       this.$message({
                      type:"success",
                      message:'删除成功！'
                    });
                  }else{
                    this.$message({
                      type:"error",
                      message:res.message
                    });
                  }
              });
      })
    },
    changeCurrent(data,node){
        this.currentData = data ;
        this.currentNode = node ;
        this.form = data ;
        this.disabled = true;
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