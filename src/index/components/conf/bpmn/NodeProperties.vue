<template>
    <el-card>
        <div v-if="!element">请选择一个元素</div>
        <div v-else>
            <el-form :model="element" status-icon :rules="rules" ref="form" size="mini" label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" prop="id">
                    <el-input disabled type="text" v-model="element.id" />
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input  v-model="element.name"   @change="element.businessObject.name = element.name" />
                </el-form-item>
                <el-form-item label="表单类型">
                    <el-input v-model="element.formCategory"></el-input>
                </el-form-item>
                <el-form-item label="表单KEY">
                    <el-input v-model="element.formKey"></el-input>
                </el-form-item>
               <!--    用户任务     -->
                <template v-if="element && element.type== 'bpmn:UserTask' ">
                    <!-- 任务节点允许选择人员 -->
                    <el-form-item label="节点人员">
                        <el-select v-model="element.userType" placeholder="请选择" @change="typeChange">
                            <el-option value="assignee" label="指定人员"></el-option>
                            <el-option value="candidateUsers" label="候选人员"></el-option>
                            <el-option value="candidateGroups" label="角色/岗位"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 指定人员 -->
                    <el-form-item label="指定人员" v-if="element.userType === 'assignee'">
                        <el-select
                                v-model="element.assignee"
                                placeholder="请选择"
                                key="1"
                                @change="">
                            <el-option
                                    v-for="item in users"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 候选人员 -->
                    <el-form-item label="候选人员" v-else-if=" element.userType === 'candidateUsers'">
                        <el-select
                                v-model="element.candidateUsers"
                                placeholder="请选择"
                                key="2"
                                multiple
                                @change=" "
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
                    <el-form-item label="角色/岗位" v-else-if="element.userType === 'candidateGroups'">
                        <el-select
                                v-model="element.candidateGroups"
                                placeholder="请选择"
                                @change="">
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
            selectedElements:[],
            rules:{},
            element: null,
            users: [
                {
                    value: "zhangsan",
                    label: "张三"
                },
                {
                    value: "lisi",
                    label: "李四"
                },
                {
                    value: "wangwu",
                    label: "王五"
                }
            ],
            roles: [
                {
                    value: "manager",
                    label: "经理"
                },
                {
                    value: "personnel",
                    label: "人事"
                },
                {
                    value: "charge",
                    label: "主管"
                }
            ]
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            this.modeler.on('selection.changed', e => {
                this.selectedElements = e.newSelection
                this.element = e.newSelection[0] // 默认取第一个
            })
            this.modeler.on('element.changed', e => {
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
        updateProperties(properties) { //更新元素属性
            const { modeler, element } = this
            const modeling = modeler.get('modeling')
            modeling.updateProperties(element, properties)
        },
        changeField (v, type) {// 改变控件触发的事件
            console.log(v);
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