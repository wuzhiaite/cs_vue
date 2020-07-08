<!-- 流程设计 -->
<template>
    <el-card :style="{'min-height':height + 'px' }">
        <el-row :gutter="24" style="width:100%;">
<!--            <el-col :span="15">-->
<!--                <el-form size="mini" :inline="true" :model="workflow.form" class="demo-form-inline">-->
<!--                    <el-form-item label="流程名称">-->
<!--                        <el-input v-model="workflow.form.modelName" placeholder="请输入流程名称"/>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="版本号">-->
<!--                        <el-input disabled v-model="workflow.form.modelKey" placeholder="请输入版本号"/>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--            </el-col>-->
            <el-col :offset="1">
                <Buttons style="float:left;" :btns="btns"/>
            </el-col>
        </el-row>
        <div ref="content" class="containers" >
            <el-row :gutter="24">
                <el-col :span="18" style="overflow:auto;">
                    <div ref="canvas" :style="{'height':height + 'px' }" class="canvas"></div>
                </el-col>
                <el-col :span="6" style="border-radius:10px !important;border:1px solid #CCC !important;">
<!--                    <NodeProperties v-if="bpmnModeler" :modeler="bpmnModeler"/>-->
                    <div  id="js-properties-panel"   />
                </el-col>
            </el-row>
        </div>
        <el-dialog :visible.sync="xmlVisible" title="XML" :fullscreen="false" top="10vh">
            <vue-ace-editor v-model="workflow.form.modelXml"
                            @init="editorInit"
                            lang="xml"
                            theme="chrome"
                            width="100%"
                            height="400"
                            :options="{wrap: true, readOnly: true}">
            </vue-ace-editor>
        </el-dialog>
    </el-card>
</template>

<script>



import BpmnViewer from 'bpmn-js';// 引入相关的依赖
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import customTranslate from './customTranslate/customTranslate';
import {mapGetters} from 'vuex';
import canvg from 'canvg'// 图片转换
import NodeProperties from './NodeProperties';
import BpmData from "./BpmData";
import VueAceEditor from 'vue2-ace-editor'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import './style/bpmn-properties-theme.css';


const customTranslateModule = {
    translate: [ 'value', customTranslate ]
};

export default {
    data() {
        return {
            workflow:{
                form:{},
                rules:[],
            },
            xmlVisible:false,
            btns:[],
            bpmnModeler: null,
            container: null,
            canvas: null,
            bpmData: new BpmData(),
        }
    },
    computed:{
        ...mapGetters({height:'getScreenHeight',width:'getScreenWidth'}),
    },
    components:{
        NodeProperties,
        VueAceEditor,
    },
    created(){
        this.initFormAndBtns();
    },
    mounted() {
            var than = this
            // 获取到属性ref为“content”的dom节点
            this.container = this.$refs.content
            const canvas = this.$refs.canvas; // 获取到属性ref为“canvas”的dom节点

            this.bpmnModeler = new BpmnModeler({ // 建模，官方文档这里讲的很详细
                container: canvas,
                // 添加控制板
                propertiesPanel: {
                    parent: '#js-properties-panel'
                },
                additionalModules: [
                    customTranslateModule,
                    propertiesProviderModule, // 左边工具栏以及节点
                    propertiesPanelModule, // 右边的工具栏
                ],
                moddleExtensions: {
                    camunda: camundaModdleDescriptor,
                }
            })
            this.adjustPalette();
            if (this.modelId) {
                this.params.modelId = this.modelId
            } else {
                this.createNewDiagram('')
            }
        },
    watch:{
       'workflow.form.modelName'(n,o){
           if(n && n.length>0){
               this.createNewDiagram('');
           }
       }
    },
    methods: {
        editorInit(){
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/xml')    //language
            require('brace/theme/chrome')
        },
        initFormAndBtns(){
            var that = this ;
            this.btns = [
                {
                    name:'保存',
                    type:'primary',
                    icon: '',
                    click:function(){
                        that.saveBpmn();
                    }
                },{
                    name:'导出图片',
                    type:'primary',
                    icon: '',
                    click:function(){
                        that.exportSvg();
                    }
                },{
                    name:'导出BPMN',
                    type:'primary',
                    icon: '',
                    click:function(){
                        that.exportBpmn();
                    }
                },{
                    name:'导入BPMN',
                    type:'primary',
                    icon: '',
                    click:function(){
                        that.Import();
                    }
                },{
                    name:'清空',
                    type:'primary',
                    icon: '',
                    click:function(){
                        that.createNewDiagram('');
                    }
                },{
                    name:'预览xml',
                    type:'primary',
                    icon: '',
                    click:function(){
                        console.log(that.workflow.form.modelXml);
                        that.xmlVisible = !that.xmlVisible
                    }
                }
            ];
            this.workflow.rules = {
                 modelName: [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
                 modelKey: [{ required: true, message: '请输入版本号', trigger: 'blur' }]
            }
            this.workflow.form = {
                modelName: '', //   模型名称
                modelKey: 'workflow_'+ this.uuid(), //    模型key(版本)
            }
        },
        createNewDiagram(bpmnXML) {
            if (bpmnXML === '' || bpmnXML === null) {
                bpmnXML = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:activiti="http://activiti.org/bpmn" xmlns:tns="http://www.activiti.org/testm1568796216967" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="m1568796216967" name="" targetNamespace="http://www.activiti.org/testm1568796216967">\n' +
                    '  <process id="workflow_'+this.uuid()+'" name="" processType="None" isClosed="false" isExecutable="true" />\n' +
                    '  <bpmndi:BPMNDiagram id="Diagram-_1" name="New Diagram" documentation="background=#FFFFFF;count=1;horizontalcount=1;orientation=0;width=842.4;height=1195.2;imageableWidth=832.4;imageableHeight=1185.2;imageableX=5.0;imageableY=5.0">\n' +
                    '    <bpmndi:BPMNPlane bpmnElement="myProcess_1" />\n' +
                    '  </bpmndi:BPMNDiagram>\n' +
                    '</definitions>'
            }
            // 将字符串转换成图显示出来
            var that = this;
            this.bpmnModeler.importXML(bpmnXML, function(err) {
                if (err) {
                    return console.error('could not import BPMN 2.0 diagram', err)
                }else{
                    that.success();//绑定监听事件
                }
            })

            // 让图能自适应屏幕
            var canvas = this.bpmnModeler.get('canvas');
            canvas.zoom('fit-viewport')
        },
        // 调整左侧工具栏排版
        adjustPalette() {
            console.log("adjust");
            try {
                // 获取 bpmn 设计器实例
                const canvas = this.$refs.canvas;
                const djsPalette = canvas.children[0].children[1].children[4];
                const djsPalStyle = {
                    width: "120px",
                    padding: "5px",
                    background: "white",
                    left: "20px",
                    borderRadius: 0,
                    'border-radius':'10px'
                };
                for (var key in djsPalStyle) {
                    djsPalette.style[key] = djsPalStyle[key];
                }
                const palette = djsPalette.children[0];
                const allGroups = palette.children;
                allGroups[0].style["display"] = "none";
                // 修改控件样式
                for (var gKey in allGroups) {
                    const group = allGroups[gKey];
                    for (var cKey in group.children) {
                        const control = group.children[cKey];
                        const controlStyle = {
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%",
                            padding: "5px",
                            height:'40px',
                            'line-height':'40px',
                        };
                        if (
                            control.className &&
                            control.dataset &&
                            control.className.indexOf("entry") !== -1
                        ) {
                            const controlProps = this.bpmData.getControl(
                                control.dataset.action
                            );
                            control.innerHTML = `<div style='font-size: 12px;font-weight:500;margin-left:15px;'>${
                                controlProps["title"]
                            }</div>`;
                            if (controlProps['tooltip']) {
                                control.title = controlProps['tooltip'];
                            }
                            for (var csKey in controlStyle) {
                                control.style[csKey] = controlStyle[csKey];
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        setEncoded(type, data) {// 当图发生改变的时候会调用这个函数，这个data就是图的xml
            const encodedData = encodeURIComponent(data);// 把xml转换为URI，下载要用到的
            if (data) {
                if (type === 'XML') {
                    // 获取到图的xml，保存就是把这个xml提交给后台
                    data = data.replace("camunda:","activiti:");
                    this.workflow.form.modelXml = data;
                    return {
                        filename: this.workflow.form.modelName+'.bpmn.xml',
                        href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
                        data: data
                    }
                }
                if (type === 'SVG') {
                    this.workflow.form.modelImage = data;
                    return {
                        filename: this.workflow.form.modelName+'.svg',
                        href: "data:application/text/xml;charset=UTF-8," + encodedData,
                        data: data
                    }
                }
            }
        },
        success() {
            this.addBpmnListener();
            this.addModelerListener()
            this.addEventBusListener()
        },
        addBpmnListener() {// 添加绑定事件
            const that = this;
            // 给图绑定事件，当图有发生改变就会触发这个事件
            this.bpmnModeler.on('commandStack.changed', function() {
                that.bpmnModeler.saveSVG(function(err, svg) {
                    that.setEncoded('SVG', err ? null : svg)
                })
                that.bpmnModeler.saveXML(function(err, xml) {
                    that.setEncoded('XML', err ? null : xml)
                })
            })
        },
        addModelerListener() {
            // 监听 modeler
            const bpmnjs = this.bpmnModeler
            const that = this

            // 'shape.removed', 'connect.end', 'connect.move'
            const events = ['shape.added', 'shape.move.end', 'shape.removed']
            events.forEach(function(event) {
                that.bpmnModeler.on(event, e => {
                    var elementRegistry = bpmnjs.get('elementRegistry')
                    var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
                    // if(!that.workflow.form.modelName){
                    //     that.$message({
                    //         type:"error",
                    //         message:"请先填写流程名称"
                    //     })
                    //     // that.createNewDiagram('');
                    //     return;
                    // }
                    if (event === 'shape.added') {
                        console.log('新增了shape')
                    } else if (event === 'shape.move.end') {
                        console.log('移动了shape')
                    } else if (event === 'shape.removed') {
                        console.log('删除了shape')
                    }
                })
            })
        },
        addEventBusListener() {
            // 监听 element
            let that = this
            const eventBus = this.bpmnModeler.get('eventBus')
            const modeling = this.bpmnModeler.get('modeling')
            const elementRegistry = this.bpmnModeler.get('elementRegistry')
            const eventTypes = ['element.click', 'element.changed']
            eventTypes.forEach(function(eventType) {
                eventBus.on(eventType, function(e) {
                    console.log(e)
                    if (!e || e.element.type == 'bpmn:Process') return
                    if (eventType === 'element.changed') {
                        // that.elementChanged(e)
                    } else if (eventType === 'element.click') {
                        console.log('点击了element')
                        var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
                        if (shape.type === 'bpmn:StartEvent') {
                            // modeling.updateProperties(shape, {
                            //     name: '我是修改后的虚线节点',
                            //     isInterrupting: false,
                            //     customText: '我是自定义的text属性'
                            // })
                            // modeling.setColor(shape, {
                            //   fill: '#ff0000',
                            //   stroke: null
                            // })
                        }
                    }
                })
            })
        },
        saveBpmn() {
            var than = this
            // 获取XML数据
            than.bpmnModeler.saveXML({ format: true }, function(err, xml) {
                if (!err) {
                    than.workflow.form.modelXml = xml
                    // 获取SVG数据（图片）
                    than.bpmnModeler.saveSVG({ format: true }, (err, data) => {
                        if (!err) {
                            var svgXml = data
                            var canvas = document.createElement('canvas') // 准备空画布
                            canvas.width = '1000px'
                            canvas.height = screen.availHeight
                            canvg(canvas, svgXml)
                            var imagedata = canvas.toDataURL('image/png')
                            than.workflow.form.modelImage = imagedata
                        }
                    })
                }
            })
        },
        Import() {// 导入

        },
        exportBpmn() {// 导出bpmn文件
            const _this = this;
            this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
                if (err) {
                    console.error(err);
                }
                let {filename, href} = _this.setEncoded('XML', xml);
                if (href && filename) {
                    let a = document.createElement('a');
                    a.download = filename; //指定下载的文件名
                    a.href = href; //  URL对象
                    a.click(); // 模拟点击
                    URL.revokeObjectURL(a.href); // 释放URL 对象
                }
            });
        },
        exportSvg() {// 导出图片
            if (window.navigator.msSaveOrOpenBlob) {
                console.log('IE浏览器无法下载，建议使用谷歌浏览器')
                return
            }
            const _this = this;
            this.bpmnModeler.saveSVG(function (err, svg) {
                if (err) {
                    console.error(err);
                }
                let {filename, href} = _this.setEncoded('SVG', svg);
                if (href && filename) {
                    let a = document.createElement('a');
                    a.download = filename;
                    a.href = href;
                    a.click();
                    URL.revokeObjectURL(a.href);
                }
            });
        },
    }
}
</script>

<style scoped>
    /*左边工具栏以及编辑节点的样式*/
    @import '~bpmn-js/dist/assets/diagram-js.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
    /*!*右边工具栏样式*!*/
    /*@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';*/

    .containers{
        width: 100%;
        height: 500px;
    }
    .canvas{
        width: 100%;
        height: 100%;
    }
</style>