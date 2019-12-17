<template>        
    <transition name="el-zoom-in-top">
        <div v-show="show"  class="el-condition-div"
            style="">
            <span  class="el-condition-span">
                <label style="font-size:12px;">
                    <strong>下拉框选项:</strong>
                </label>
                <el-select v-model="value" 
                    size="mini"
                    clearable="true" 
                    multiple="false"
                    filterable
                    placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </span>
            <span class="el-condition-span" >
                <label style="font-size:12px;">
                    <strong>测试时间框:</strong>
                </label>
                <el-date-picker
                    size="mini"
                    type="dates"
                    v-model="value4"
                    placeholder="时间">
                    </el-date-picker>
            </span>               
        </div> 
    </transition>      
</template>
<script>


 export default {
    data(){
      return {
      }
    },
    created(){
    },
    methods:{
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





























