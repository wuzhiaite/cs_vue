<template>
    <mavon-editor
            ref=md
            :style="{height:height*0.8+'px'}"
            :toolbars="markdownOption"
            @save="saveEditor"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
            v-model="handbook"/>
</template>
<script>

import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            id:"",
            markdownOption: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            handbook: "",
        };
    },
    computed:{
        ...mapGetters({
            height:"getScreenHeight",
        }),
    },
    created(){
        this.id = this.$route.params.id ;
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
            let form = {
                md:value,
                html:render,
                id:id,
            }
            this.$axios.post("/api/article/md/saveArticle")
                .then(res=>{
                    if(res.data.code == 1){
                        this.$message({
                            type:'success',
                            message:"保存成功",
                        });
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