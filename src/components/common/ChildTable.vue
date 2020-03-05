<template>
<div>
   <div>
       <table>
           <thead>
               <th v-for="(v,k) in  item"> {{k.label}} </th>
           </thead>   
       </table>
    </div> 
    <div>
        <table>
            <tr v-for="(row,index) in getRows()">
                <td v-for="(v,k) in row">
                    <ComFormSpan :item="v" :form="form[v.prop][index][v.prop]" />
                </td>
            </tr>
        <table>  
    </div>
</div>      
</template>
<script>
import ComFormSpan from './ComFormSpan'

export default {
    props:{
        item:{
            required:true,
            type:Array,
        },
        form:{
            required:true,
            type:Object,
        }
    }
}
</script>
<style scoped>
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
</style>