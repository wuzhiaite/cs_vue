<template>
  <div style="width:50%;margin:auto;">  
    <table v-if="tblist.length > 0"  >
      <thead>
        <th  v-for="(value,index) in columns"
            :width="width * 0.84 /columns.length - 2 + 'px'" >
          <strong> {{value}} </strong>
        </th>
      </thead>  
    </table> 
    <div :style="{ height : height * 0.8 + 'px'}" class="el-table">
      <table v-if="tblist.length > 0">
        <tbody>    
            <tr  v-for="tb in tblist" >
                <td v-for="(t,k) in tb" 
                    :colspan="t.col ? t.col : 0" 
                    :rowspan="t.row ? t.row:0"
                    :width="width * 0.84 /columns.length + 'px' "
                    :class="{'el-left':k == firstFile, 'el-right':k!=firstFile, 'el-color': JSON.stringify(tb).indexOf('TOTAL') != -1}">
                    {{t.value == 'TOTAL' ? '总计' : t.value}}
                </td>
            </tr>
        </tbody>
      </table>
    </div>

  </div> 
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  name:'index',
  data:function(){
    return {
      tblist:[],
      columns:[],
      firstFile:'',
      width:document.body.clientWidth,
    }
  },
  created:function(){
    this.initData();
  },
  computed:{
     ...mapGetters({height:'getScreenHeight'}),
  },
  methods:{
    initData:function(){
        this.tblist = require('./Exp02.json');
        for(var i in this.tblist[0]){
           this.columns.push(i);
        }
        this.firstFile = this.columns[0];
        
    },
    
  }



}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.el-left{
  text-align:left;
}
.el-right{
  text-align:right;
}
.el-color{
  background-color:yellow;
}
.el-table{
  overflow-x:auto;
  overflow-y:auto;
}
.quarter-div{
  width: 50%;
  height: 50%;
  float: left;
}
table{
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
    }
table td, table th{
  border: 1px solid #cad9ea;
  color: #666;
  height: 35px;
}
table thead th{
  background-color: #CCE8EB;
}
table tr:nth-child(odd){
  background: #fff;
}

table tr:nth-child(even){
  background: #fff;
}



</style>

























