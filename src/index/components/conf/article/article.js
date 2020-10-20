/**
 * 查询博客细节
 * @param that
 * @returns {*}
 */
export function blogDetail(that){
   return that.$axios.post("/api/article/getBlogById/"+that.id);
}

/**
 *
 * @param that
 * @returns {*}
 */
export function blogList(that){
    return that.$axios.post("/api/article/getList");
}


/**
 * 返回按钮
 * @param that
 * @returns {{name: string, icon: string, disabled: boolean, type: string, click: click}[]}
 */
export function backBtn(that){
    return [
        {
            name : '返回',
            type : 'primary',
            icon : 'el-icon-back',
            disabled : false,
            click : function(){
                // that.$router.go(-1);
                that.$axios.post("/api/pagelist/downloadFile/2d39",{"token":that.token})
                    .then(res=>{
                        console.log(res);
                    });

            }
        }
    ]
} ;



/**
 * 配置按钮
 * @param that
 * @returns {({hasPermission: [string], name: string, icon: string, disabled: boolean, type: string, click: click}|{hasPermission: [string], name: string, icon: string, disabled: boolean, type: string, click: click}|{name: string, icon: string, disabled: boolean, type: string, click: click})[]}
 */
export function btns(that){
    return [
        {
            name : '保存',
            type : 'primary',
            hasPermission:['can_add'],
            icon : 'el-icon-circle-plus-outline',
            disabled : false,
            click : function(){
                alert('有下面的保存先');
            }
        },
        {
            name : '删除',
            type : 'primary',
            hasPermission:['can_delete'],
            icon : 'el-icon-delete',
            disabled : false,
            click : function(){
                that.$axios.post("/api/article/removeById/"+that.id)
                    .then(res=>{
                       if(res.data.code == 1){
                            that.$router.go(-1);
                       }
                    })
            }
        },
        {
            name : '返回',
            type : 'primary',
            icon : 'el-icon-back',
            disabled : false,
            click : function(){
                that.$router.go(-1);
            }
        }
    ];
}


/**
 * 配置表单样式
 * @type {{ref: string, inline: boolean, formItems: [{prop: string, label: string, type: string}, {clearable: boolean, prop: string, label: string, type: string, url: string}], labelPosition: string, labelWidth: string}}
 */
export const formDesign = {
    ref:'md',
    inline:true,
    labelPosition:'left',
    labelWidth:'auto',
    formItems : [
        {
            prop:'name',
            label:'博客名称:',
            type:'input',
        },
        {
            prop:'module',
            label:'模块类型:',
            type:'select',
            clearable:true,
            url:'/api/dict/getdict/public_blog_type',
        }
    ],
}


/**
 * md工具栏
 * @type {{preview: boolean, code: boolean, underline: boolean, superscript: boolean, link: boolean, save: boolean, redo: boolean, italic: boolean, undo: boolean, navigation: boolean, quote: boolean, alignleft: boolean, subfield: boolean, ul: boolean, strikethrough: boolean, ol: boolean, table: boolean, subscript: boolean, imagelink: boolean, bold: boolean, alignright: boolean, trash: boolean, help: boolean, fullscreen: boolean, aligncenter: boolean, htmlcode: boolean, readmodel: boolean, header: boolean, mark: boolean}}
 */
export const toolbars = {
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
}


