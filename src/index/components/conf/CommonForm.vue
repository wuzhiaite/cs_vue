<template>
<div>    
    <span style="text-align:left;font-size:20px;">
        <strong>通用表单</strong>
    </span>
    <table>
        <tr>
            <td style="" class="td-label">
            <span>
                <strong>姓名:</strong>
            </span>
            </td>
            <td class="td_form">
                <el-input size="mini"
                v-model="form.name" 
                style="width:100%;padding:0px;"
                placeholder="请输入内容" clearable></el-input>
            </td>
            <td class="td-label">
            <span>
                <strong>性别:</strong>
            </span>
            </td>
            <td class="td_form">
                <el-select v-model="form.gender" size="mini" placeholder="请选择" style="width:100%;padding:0px;" >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
            </td>             
        </tr>
        <tr>
            <td class="td-label">
                <span>
                <strong>居住地:</strong>
                </span>
            </td>
            <td class="td_form">
                <el-cascader
                    v-model="form.liveArea"
                    size="mini"
                    style="width:100%;padding:0px;"
                    :options="demon.options"
                    :props="{ expandTrigger: 'hover' }"></el-cascader>
            </td> 
            <td class="td-label">
                <span>
                <strong>是否为应届毕业生:</strong>
                </span>
            </td> 
            <td class="td_form">
                <el-switch
                size="mini"
                style="width:100%;padding:0px;"
                v-model="form.isGraduates"
                active-text="是"
                inactive-text="否">
                </el-switch>  
            </td> 
        </tr>
        <tr>
            <td class="td-label">
                <span>
                <strong>学历水平:</strong>
                </span>
            </td> 
            <td class="td_form">
                <el-radio-group  size="mini" v-model="form.edu" 
                            style="display:inline;padding:0px;">
                    <el-radio 
                        size="mini"
                        v-for="item in edus" 
                        style="padding:0px;font-size:12px;margin-right:5px;"          
                        :label="item.value">{{item.name}}</el-radio>
                    </el-radio-group>
            </td> 
            <td class="td-label">
                <span>
                <strong>兴趣爱好:</strong>
                </span>
            </td> 
            <td  class="td_form">
                    <el-checkbox-group v-model="form.checkbox"
                                size="mini"
                                style="display:inline;padding:0px;">
                        <el-checkbox 
                            size="mini"
                            style="padding:0px;font-size:12px;margin-right:10px;"
                            v-for="lk in likes" 
                            :label="lk.value" :key="lk.value">{{lk.name}}</el-checkbox>
                    </el-checkbox-group>           
            </td>         
        </tr> 
        <tr>
            <td class="td-label">
                <span>
                <strong>出生日期:</strong>
                </span>
            </td> 
            <td class="td_form">
                <el-date-picker
                    v-model="form.startTime"
                    size="mini"
                    style="width:100%;padding:0px;"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </td> 
            <td class="td-label">
                <span>
                <strong>毕业日期:</strong>
                </span>
            </td> 
            <td class="td_form">
                <el-date-picker
                    v-model="form.graduateTime"
                    size="mini"
                    style="width:100%;padding:0px;"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>          
            </td>         
        </tr> 
         <tr>
            <td class="td-label">
                <span>
                <strong>评分:</strong>
                </span>
            </td> 
            <td class="td_form">
               <div class="block">
                  <el-rate
                    show-text
                    v-model="value2"
                    :colors="colors">
                  </el-rate>
                </div>
            </td> 
            <td class="td-label">
                <span>
                <strong>毕业日期:</strong>
                </span>
            </td> 
            <td class="td_form">
                <el-date-picker
                    v-model="form.graduateTime"
                    size="mini"
                    style="width:100%;padding:0px;"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>          
            </td>         
        </tr> 

        <tr>
            <td class="td-label">
                <span>
                <strong>自我评价:</strong>
                </span>
            </td> 
            <td  class="td_form" colspan="3">
                    <el-input type="textarea" 
                        style="width:100%;padding:0px;"
                        v-model="form.shelfDes"></el-input>           
            </td> 
        </tr> 
        <tr>
            <td class="td-label">
                <span>
                <strong>个性图片:</strong>
                </span>
            </td> 
            <td  class="td_form" colspan="3">
                <div>
                    <el-upload
                    style="width:100px;margin-right:10px;"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <span  style="display:inline-block;" >
                        <img v-if="imageUrl" :src="imageUrl" 
                            class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"
                          style="border:1px solid gray;background-color:white;"
                        ></i>
                    </span>
                    </el-upload>    
                  
                </div>
            </td> 
        </tr>  
        <tr>
           <td  class="td_form" colspan="4">
            <div style="width:100%;text-align:left;">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
              </el-upload>
            </div>
           </td>
        </tr>  
    </table>    
  
</div> 

</template>
<script>
 

 export default {
    data(){
      return {
        options:[{label:'男',value:'boy'},{label:'女',value:'girl'}],
        form:{
          checkbox:[],
        },
        demon:{},
        edus:[{name:'本科',value:'bk'},
              {name:'大专',value:'dz'},
              {name:'高中',value:'gz'},
              {name:'中专',value:'zz'}],
        likes:[{name:'篮球',value:'basketball'},
              {name:'乒乓球',value:'pingpang'},
              {name:'游泳',value:'swmming'}],
        cities: ['上海', '北京', '广州', '深圳'],   
        checkedCities:[],   
        imageUrl:'',
      }
    },
    watch:{
      "form":{
            deep:true,
            handler(n){
              console.log(JSON.stringify(n));
            }
        }

    },
    created(){
    },
    methods:{
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
 }

</script>
<style scoped>

span{
  width:50px;
  font-size:12px;
  padding:0px;
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

.td-label{
  width:20%;
  background-color:#D1E7FE;
}
.td-form{
  width:30%;
}
.el-tb-common{
  width:100%;
  padding:0px;
  border:0px;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }



</style>





























