<template>      
    <transition name="el-zoom-in-top">
        <div class="el-condition-div" v-if="show" >
            <span   v-for="(item,index) in conditions"                 
                    class="el-span" >
                <slot name="header"> </slot>    
                <span class="label-span" >
                     <strong>{{item.label}}:</strong>
                </span>
                <span class="el-condition-span">
                    <el-select v-if="item.type == 'select' "
                        v-model="item.value" 
                        style="width:150px;"
                        :size=" item.size ? item.size : 'mini' "
                        :clearable="item.ismulti ? false : true" 
                        :multiple="item.ismulti ? true : false"
                        @change="synData(index,item)"
                        filterable
                        :placeholder="item.placeholder ? item.placeholder : '请选择' ">
                        <el-option
                            v-for="opt in item.options"
                            :key="opt.value"
                            :label="opt.label"
                            :value="opt.value"
                            :disabled="opt.disabled?opt.disabled:false">
                        </el-option>
                    </el-select>
                    <el-date-picker v-if=" item.type == 'date' "
                        style="width:150px;"
                        @change="synData(index,item)"
                        :size=" item.size ? item.size : 'mini' "
                        type="dates"
                        v-model="item.value"
                        :placeholder="item.placeholder">
                    </el-date-picker >
                     <el-switch v-if=" item.type == 'bol' " 
                            style="width:150px;"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-text="item.activeText"
                            :inactive-text="item.inactiveText"
                            v-model="item.value">
                     </el-switch>
                     <span v-if=" item.type == 'interval' " >
                          <el-date-picker 
                            style="width:130px;"
                            @change="synData(index,item)"
                            :size=" item.size ? item.size : 'mini' "
                            type="dates"
                            v-model="item.startTime"
                            :placeholder="item.placeholder">
                          </el-date-picker >
                            -
                          <el-date-picker 
                            style="width:130px;"
                            @change="synData(index,item)"
                            :size=" item.size ? item.size : 'mini' "
                            type="dates"
                            v-model="item.endTime"
                            :placeholder="item.placeholder">
                         </el-date-picker >
                    </span>
                     <el-radio-group 
                         v-model="item.value" 
                         @change="synData(index,item)"
                         :size=" item.size ? item.size : 'mini' "
                         v-if="item.type == 'radio-buttons'">
                        <el-radio-button v-for="opt in item.options" 
                           :disabled="item.disabled ? item.disabled : false"
                           :label="opt.label" :key="opt.value"></el-radio-button>    
                     </el-radio-group>
                </span>
                <slot name="footer" :index="index"></slot>
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
            default : true,
        }
    },
    data:function(){
        return {
               pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
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
    margin:auto;
    text-align:left;
    font-size:12px;
    padding:15px;
}
.el-span{
    display:inline-block;
    margin-top:15px;
}
.el-condition-span {
    display:inline-block;
    margin-right:15px;
}
.label-span {
    display:inline-block;
    width:70px;
    margin-right:5px;
    margin-bottom: 15px;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap !important;
}

</style>





























