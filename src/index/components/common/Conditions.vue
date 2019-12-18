<template>        
    <transition name="el-zoom-in-top">
        <div class="el-condition-div" v-if="show" >
            <span  class="el-condition-span" v-for="(item,index) in conditions">
                <label>
                    <strong>{{item.label}}</strong>
                </label>
                <el-select v-if="item.type == 'select' "
                    v-model="item.value" 
                    :size=" item.size ? item.size : 'mini' "
                    :clearable="item.ismulti ? false : true" 
                    :multiple="item.ismulti ? true : false"
                    @change="synData(index,item)"
                    filterable
                    placeholder="item.placeholder ? item.placeholder : '请选择' ">
                    <el-option
                        v-for="opt in item.options"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                        :disabled="opt.disabled">
                    </el-option>
                </el-select>
                <el-date-picker v-if=" item.type == 'date' "
                    @change="synData(index,item)"
                    :size=" item.size ? item.size : 'mini' "
                    type="dates"
                    v-model="item.value"
                    :placeholder="item.placeholder">
                </el-date-picker>
            </span>               
        </div> 
    </transition>      
</template>
<script>
 export default {
    props:{
        conditions:{
            type : Array,
            default : []
        },
        show:{
            type : Boolean,
            default : false,
        }
    },
    methods:{
        synData:function(index,item){
            console.log(item);
            this.$alert(JSON.stringify(item)+'&index='+index);
            this.$emit("conditions:update",this.conditions);
        }
    }
 }


</script>
<style scoped>
.el-condition-div{
    display:block;
    background-color:#D1E7FE;
    width:100%;
    margin:10px;
    text-align:left;
    font-size:12px;
}
.el-condition-span {
    width:33.33%;
    display:inline-block;
}

</style>





























