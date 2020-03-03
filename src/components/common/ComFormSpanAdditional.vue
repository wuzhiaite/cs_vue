<template>
    <span>
         <span v-if="item.type == 'select-form' " >
          <div  style="border:1px solid #DCDFE6;padding:5px;border-radius: 5px;"  
                              v-show="item.events.isShow ? item.events.isShow() : true">
                <el-row v-for="(row,index) in item.events.getRows()" >
                    <span v-for="(columns,key) in row" style="margin-left:10px;" >
                      <template v-for="(k,v) in columns" >
                          <label> {{v}}:</label>
                          <el-input 
                              style="width:25%;"
                              size="mini"
                              v-model="form[item.prop][index][k]"></el-input>   
                      </template>
                    </span> 
                    <span style="margin-left:20px;">
                      <el-button type="primary" size="mini" >
                        <span @click="item.events.addColumn()" >新增</span> |
                        <span @click="item.events.deleteColumn()"> 删除  </span>
                      </el-button>
                    </span>
                </el-row>
          </div> 
        </span> 
    </span>    
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>