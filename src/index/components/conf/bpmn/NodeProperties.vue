<template>
    <el-card>
        <div v-if="selectedElements.length<=0">请选择一个元素</div>
        <div v-else>
            {{element}}
            <el-form :model="element" status-icon :rules="rules" ref="ruleForm" size="mini" label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" prop="id">
                    <el-input disabled type="" v-model="element.id" />
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input  v-model="element.name"  @change="changeField(value, 'name')"  />
                </el-form-item>
               <!--    用户任务     -->
                <template v-if="element && element.type== 'bpmn:UserTask' ">
                    <el-form-item label="表单类型">
                        <el-input v-model="form.formCategory"></el-input>
                    </el-form-item>
                    <el-form-item label="表单KEY">
                        <el-input v-model="form.formKey"></el-input>
                    </el-form-item>
                    <!-- 任务节点允许选择人员 -->
                    <el-form-item label="节点人员">
                        <el-select v-model="form.userType" placeholder="请选择" @change="typeChange">
                            <el-option value="assignee" label="指定人员"></el-option>
                            <el-option value="candidateUsers" label="候选人员"></el-option>
                            <el-option value="candidateGroups" label="角色/岗位"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 指定人员 -->
                    <el-form-item label="指定人员" v-if="userTask && form.userType === 'assignee'">
                        <el-select
                                v-model="form.assignee"
                                placeholder="请选择"
                                key="1"
                                @change="(value) => addUser({assignee: value})">
                            <el-option
                                    v-for="item in users"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 候选人员 -->
                    <el-form-item label="候选人员" v-else-if="userTask && form.userType === 'candidateUsers'">
                        <el-select
                                v-model="form.candidateUsers"
                                placeholder="请选择"
                                key="2"
                                multiple
                                @change="(value) => addUser({candidateUsers: value.join(',') || value})"
                        >
                            <el-option
                                    v-for="item in users"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 角色/岗位 -->
                    <el-form-item label="角色/岗位" v-else-if="userTask && form.userType === 'candidateGroups'">
                        <el-select
                                v-model="form.candidateGroups"
                                placeholder="请选择"
                                @change="(value) => addUser({candidateGroups: value})">
                            <el-option
                                    v-for="item in roles"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
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
            rules:{},
            form:{},
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
        changeField (v, type) {// 改变控件触发的事件
            const value = v;
            let properties = {}
            properties[type] = value;
            this.element[type] = value
            this.updateProperties(properties) // 调用属性更新方法
        },
    }
}
</script>
<style scoped>
.el-card div{
    font-size:12px;
}
</style>