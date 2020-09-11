<template>
    <div>
        <el-row :gutter="24" style="height:100%;">
            <el-col :span="8">
                <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                        <Buttons style="float:right;" :btns="btns" />
                    </div>
                    <el-tree
                            :data="department"
                            show-checkbox
                            node-key="id"
                            draggable
                            default-expand-all
                            current-node-key
                            :expand-on-click-node="false"
                            @node-drag-end="handleDragEnd"
                            @node-click="changeCurrent">
                    </el-tree>
                </el-card>
            </el-col>
            <!-- 菜单表单 -->
            <el-col :span="15" :offset="1">
                <el-card class="box-card" style="overflow-y:auto">
                    <ComForm :formDesign="formDesign"
                             :form.sync="form"
                             :btns="[]">
                        <template #menuList>
                            <div class="permission-table" id="child-table">
                                <el-table
                                        :data="treeData"
                                        style="width: 100%;margin-bottom: 20px;"
                                        row-key="id"
                                        size="mini"
                                        default-expand-all
                                        ref="multipleTable"
                                        @selection-change="handleSelectionChange"
                                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                                    <el-table-column
                                        type="selection"
                                        width="55">
                                    </el-table-column>
                                    <el-table-column
                                        prop="label"
                                        label="菜单名称"
                                        width="">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>

                    </ComForm>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            department: [],
            currentData:{},
            currentNode:{},
            multipleSelection:[],
            form:{},
            disabled:true,
            moveTempt:{},
            formDesign:{},
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created(){
        this.getTreeData();
    },
    beforeMount(){
        this.initBtns();
        this.formInit();

    },
    methods: {
        getTreeData(){
            this.$axios
                .post("/api/sys/menus/getList")
                .then(res => {
                    if(res.status == 200 && res.data.code == 1){
                        var result = res.data.result ;
                        this.treeData = result;
                        this.getDepartmentList();
                    }else{
                        this.$message({
                            type:"error",
                            message:'查询失败，请稍后重试！！！'
                        });
                    }
                });
        },
        formInit(){
            this.formDesign = {
                rules : {
                    name : [
                        { required:true , message:'必须填写' , trigger:'blur' },
                        { min:3 , max:10 , message:'长度再3-10个字以内' , trigger:'blur' },
                    ],
                    path : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
                    realPath : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
                    isvalidate : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
                },
                formItems : [
                    {
                        prop:'id',
                        label:'id',
                        type:'input',
                        disabled:true,
                    },
                    {
                        prop:'departmentName',
                        label:'部门名称',
                        type:'input',
                    },{
                        prop:'isValidate',
                        label:'是否有效',
                        type:'switch',
                        active:'yes',
                        inactive:'no',
                    },
                    // {
                    //     prop:'menuList',
                    //     label:'可访问菜单',
                    //     type:'common-tree',
                    //     showCheckBox:true,
                    //     url:"/api/sys/menus/getList",
                    // },
                    {
                        prop:'menuList',
                        label:'可访问菜单',
                        type:'slot-form',
                    },{
                        prop:'bz',
                        label:'备注',
                        type:'textarea',
                    }
                ],
            }
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            if(dropType == 'before' || dropType == 'after'){
                draggingNode.data.fatherId = dropNode.data.fatherId ;
            }else if (dropType == 'inner'){
                draggingNode.data.fatherId = dropNode.data.id ;
            }
        },
        initBtns : function(){
            var that = this ;
            this.btns = [
                {
                    name:'删除',
                    type:'primary',
                    click:function(){
                        that.remove();
                    }
                },
                {
                    name:'新增',
                    type:'primary',

                    click:function(){
                        that.append();
                    }
                },{
                    name:'保存',
                    type:'primary',
                    click:function(){
                        that.save();
                    }
                }
            ];
        },
        save(){
            this.changeDepartmentMenuControl();
            var dep = this.department;
            var tempArr = [] ;
            this.updateDepartment(dep,tempArr);
            this.$axios
                .post("/api/department/batchAddOrUpdate",tempArr)
                .then(res => {
                    if(res.status == 200 && res.data.code == 1){
                        this.$message({
                            type:"success",
                            message:"保存成功"
                        });
                    }else{
                        this.$message({
                            type:"error",
                            message:res.data.message
                        });
                    }
                });
        },
        updateDepartment(department,tempArr){ //对菜单顺序进行排序
            for(var i in department){
                var tempObj = department[i];
                var len = tempArr.length ? tempArr.length + 1 : 1 ;
                tempObj.orderBy = len ;
                var list = tempObj.menuList;
                var index = lodash.findIndex(list,function(o){return o == "root"});
                if( index == -1 ){//如果不是全选要额外增加  update 2020-06-14
                    list.push('root');
                }
                if(list && list.length > 0){
                    tempObj.menus = JSON.stringify(list);
                }
                tempArr.push(tempObj);
                var children = department[i].children ;
                if(children && children.length > 0){
                    this.updateDepartment(children,tempArr);
                }
            }
        },
        getDepartmentList(){
            this.$axios
                .post("/api/department/getList")
                .then(res => {
                    if(res.status == 200 && res.data.code == 1){
                        var department = res.data.result ;
                        this.department = department;
                        this.form = department[0] ;
                        this.toggleSelection(department[0]);
                    }else{
                        this.$message({
                            type:"error",
                            message:'查询失败，请稍后重试！！！'
                        });
                    }
                });
        },
        append() {
            var data = this.currentData ;
            var newChild = {
                id: this.uuid(),
                label: '',
                fatherId : data.id,
                isValidate : 1,
                children: [] } ;
            // if(data.id == 'root' ){
            //     newChild.path = '/home';
            //     newChild.realPath = 'Home';
            // }
            if (!data.children) {
                this.$set(data, 'children', []) ;
            }
            data.children.push(newChild) ;
            this.disabled = false ;
            this.form = newChild ;
        },
        remove() {
            this.$confirm("是否确定删除此菜单？","提示",{
                confirmButtonText:"确定删除"
            }).then(()=>{
                this.removeById();
            })
        },
        removeById(){
            const node = this.currentNode;
            const data = this.currentData;
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const id = data.id;
            const index = children.findIndex(d => d.id === id);
            children.splice(index, 1);
            this.form = this.temp;
            this.$axios
                .post("/api/department/removeById/"+id )
                .then(res => {
                    if(res.status == 200 && res.data.code == 1){
                        this.$message({
                            type:"success",
                            message:'删除成功！'
                        });
                        this.form = this.department[0] ;
                    }else{
                        this.$message({
                            type:"error",
                            message:res.message
                        });
                    }
                });
        },
        changeCurrent(data,node){//改变部门选中节点
            this.changeDepartmentMenuControl();
            this.currentData = data ;
            this.currentNode = node ;
            this.form= data;
            this.toggleSelection(data);
            this.disabled = true;
        },
        toggleSelection(data) {//加载department节点后，渲染菜单选中数据
            this.$refs.multipleTable.clearSelection();
            if (data) {
                var list = data.menuList ;
                this.renderSelection(this.treeData,list) ;
            }
        },
        renderSelection(rows,list){//递归遍历departments数据，选中
            rows.forEach(row => {
                var index = lodash.indexOf(list,row.id);
                if(index != -1){
                    this.$refs.multipleTable.toggleRowSelection(row);
                }
                if(row.children){
                    this.renderSelection(row.children,list);
                }
            });
        },
        handleSelectionChange(val){//选中项记录进表单中
            this.multipleSelection = val;
        },
        changeDepartmentMenuControl(){//更改当前选中department对象的菜单权限
            var that = this;
            if(!that.multipleSelection || that.multipleSelection.length == 0){
                return ;
            }
            this.recursionDepartmentData(this.department);
            this.multipleSelection = [];
        },
        recursionDepartmentData(department){//递归遍历判断当前表单是否departments的子部门
            var that = this;
            department.forEach(d =>{
                if(d.id == that.form.id){
                    var arr = [];
                    that.multipleSelection.forEach(v => {
                        arr.push(v.id);
                    })
                    d.menuList = arr ;
                    return;
                }
                if(d.children && d.children.length > 0){
                    this.recursionDepartmentData(d.children);
                }
            })
        }



    }

}
</script>
<style scoped>
    .el-row .el-col {
        height:100%;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        height:100%;
    }
    .permission-table{
        border: 1px solid #ddd;
        padding:10px;
        border-radius:7px;
        overflow-x:auto;
    }
</style>