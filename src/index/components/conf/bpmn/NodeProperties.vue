<template>
    <el-card>
        <div v-if="selectedElements.length<=0">请选择一个元素</div>
        <div v-else>
            <el-form :model="element" status-icon :rules="rules" ref="ruleForm" size="mini" label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" prop="id">
                    <el-input type="" v-model="element.id" ></el-input>
                </el-form-item>
                <el-form-item label="name" prop="name">
                    <el-input type="" v-model="element.name"  @change="(event) => changeField(event, 'name')"  ></el-input>
                </el-form-item>
                <el-form-item label="customProps" prop="customProps">
                    <el-input v-model="element.customProps" @change="(event) => changeField(event, 'customProps')"/>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>
<script>
export default {
    name: 'PropertiesView',
    props: {
        modeler: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            selectedElements: [], // 当前选择的元素集合
            element: null // 当前点击的元素
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            const { modeler } = this // 父组件传递进来的 modeler
            modeler.on('selection.changed', e => {
                this.selectedElements = e.newSelection // 数组, 可能有多个
                this.element = e.newSelection[0] // 默认取第一个
                this.setDefaultProperties() // 设置一些默认的值
            })
            modeler.on('element.changed', e => {
                const { element } = e
                const { element: currentElement } = this
                if (!currentElement) {
                    return
                }
                // update panel, if currently selected element changed
                if (element.id === currentElement.id) {
                    this.element = element
                }
            })
        },
        setDefaultProperties() {
            const { element } = this
            if (element) {
                // 这里可以拿到当前点击的节点的所有属性
                const { type, businessObject } = element
                // doSomeThing
            }
        },
        updateProperties(properties) { //更新元素属性
            const { modeler, element } = this
            const modeling = modeler.get('modeling')
            modeling.updateProperties(element, properties)
        },
        changeField (event, type) {// 改变控件触发的事件
            const value = event.target.value
            let properties = {}
            properties[type] = value
            this.element[type] = value
            this.updateProperties(properties) // 调用属性更新方法
        }
    }
}
</script>
<style>
.el-card div{
    font-size:12px;
}
</style>