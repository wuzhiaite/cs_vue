<template>
<div>
    <el-row>
        <el-col :span="20">
             <ComForm :formDesign="formDesign" :form="form" :btns="btns"/>
        </el-col>
    </el-row>
    <el-row>
        <mavon-editor
                ref=md
                :style="{'min-height':height+'px'}"
                :toolbars="markdownOption"
                @save="saveEditor"
                @imgAdd="imgAdd"
                @imgDel="imgDel"
                v-model="handbook"/>
    </el-row>
</div>
</template>
<script>

import {mapGetters} from 'vuex';
import {formDesign,toolbars,btns,blogDetail} from './article'

export default {
    data() {
        return {
            id:"",
            markdownOption: toolbars,
            handbook: "",
            formDesign:{},
            btns:[],
            form:{
                name:'',
                module:'',
            }
        };
    },
    computed:{
        ...mapGetters({
            height:"getScreenHeight",
        }),
    },
    created(){
        let that = this;
        this.$nextTick().then(()=>{
            that.formDesign = formDesign;
        })
        this.id = this.$route.params.id ;
        this.getBlogDetail();
        this.btns = btns(that);

    },
    methods:{
        imgAdd(pos, $file){
            let formdata = new FormData();
            let name = $file.name
            formdata.append('image', $file);
            this.$axios({
                url: '/api/upload/imgupload',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(res => {
               if(res.data.code == 1){
                   this.$refs.md.$img2Url(pos, res.data.result);
               }
            })
        },
        imgDel(files){
            let url = files[0];
            let idx = url.lastIndexOf("/");
            let fileName = url.substring(idx+1,url.length);
            this.$axios.post("/api/upload/deleteUploadFile/"+fileName)
            .then(res=>{
                if(res.data.code == 1){
                    this.$message({
                        type:'success',
                        message:"删除成功",
                    });
                }
            })
        },
        saveEditor(value,render){
            let temp = {
                designText:value,
                id: this.id,
                ...this.form,
            }
            temp.html = render;
            temp.designText = value;
            this.$axios.post("/api/article/addOrUpdatePage",temp)
                .then(res=>{
                    if(res.data.code == 1){
                        this.$message({
                            type:'success',
                            message:"保存成功",
                        });
                    }
                })
        },
        getBlogDetail(){
            blogDetail(this).then(res=>{
                    let data = res.data ;
                    if(data.code == 1 && data.result){
                        let result = data.result;
                        this.form = result
                        this.handbook = result.designText ? result.designText : '';
                    }
                })
        }
    }
};
</script>

<style scoped>
    .mavonEditor {
        width: 100%;
        height: 100%;
    }

</style>