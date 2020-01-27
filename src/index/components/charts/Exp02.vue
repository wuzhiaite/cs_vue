<template>
  <div class="main">  
     <table v-if="tblist.length > 0">
       <tr>
         <th v-for="(value,key) in tblist[0]" style="position:absolute">{{key}}</th>
       </tr>      
       <tr  v-for="tb in tblist">
         <template v-for="t in tb">
            <td  :colspan="t.col?t.col:0" :rowspan="t.row?t.row:0">
               {{t.value == 'TOTAL' ? '总计' : t.value}}
            </td>
          </template>
       </tr>
      </table>
  </div> 
</template>
<script>

export default {
  name:'index',
  data:function(){
    return {
      tblist:[],
    }
  },
  created:function(){
    this.initData();
  },
  methods:{
    initData:function(){
    }
  }



}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.main{
  width: 82%;
  height: 83%;
  position: absolute;
  overflow-y:scroll;
  overflow-x:scroll; 
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
  height: 30px;
}
table thead th{
  background-color: #CCE8EB;
  width: 100px;
}
table tr:nth-child(odd){
  background: #fff;
}

table tr:nth-child(even){
  background: #F5FAFA;
}



</style>

























