/**
 * 流程列表
 * @param that
 * @returns {[[{imagurl: any, name: string, click: click}, {imagurl: any, name: string}, {imagurl: any, name: string}, {imagurl: any, name: string}, {imagurl: any, name: string}], [{imagurl: any, name: string}, {imagurl: any, name: string}, {imagurl: any, name: string}, {imagurl: any, name: string}, {imagurl: any, name: string}]]}
 */
export const workflow = function(that){
    return [
        [
            {
                name:"请假申请",
                imagurl:require("@/assets/img/workflow/workflow-01.jpg"),
                click:function(){
                    that.$router.push({path:'/startworkflow',query:{key:'workflow_207f493',id:'10027'}})
                }
            },{
            name:"加班申请",
            imagurl:require("@/assets/img/workflow/workflow-02.jpg"),
        },{
            name:"离职申请",
            imagurl:require("@/assets/img/workflow/workflow-03.jpg"),
        },{
            name:"转正申请",
            imagurl:require("@/assets/img/workflow/workflow-04.jpg"),
        },{
            name:"异动申请",
            imagurl:require("@/assets/img/workflow/workflow-05.jpg"),
        }
        ],
        [
            {
                name:"用章申请",
                imagurl:require("@/assets/img/workflow/workflow-06.jpg"),
            },{
            name:"办公用品申请",
            imagurl:require("@/assets/img/workflow/workflow-07.jpg"),
        },{
            name:"IT维护申请",
            imagurl:require("@/assets/img/workflow/workflow-08.jpg"),
        },{
            name:"出差申请",
            imagurl:require("@/assets/img/workflow/workflow-09.jpg"),
        },{
            name:"补助申请",
            imagurl:require("@/assets/img/workflow/workflow-10.jpg"),
        }
        ],

    ];
}









