<template>
      <CommonPage :pageParam="param" />
</template>
<script>
export default {
    props:['pageParam'],
    data:function(){
        return {
            param:{}
        }
    },
    watch:{
        formatParam:{
            deep:true,
            immediate:true,
            handler(n,o){
                this.formatParam();
            }
        }
    },
    methods:{
        formatParam : function(){//格式化列表数据
             let that = this;  
             window.that = this ;
            //1.格式化按钮
             var btns = that.pageParam.btns ;
             for(var i in btns){
                 var events = btns[i].events ;
                if(events){
                    var funcTest = (new Function('return '+events))() ;
                    btns[i].click = funcTest.click
                                    // ? funcTest.click.call(this,arguments) 
                                    ? funcTest.click
                                    : null ;
                    btns[i].hover = funcTest.hover ? funcTest.hover : null ; 
                }  
             }
              
             that.pageParam.btns = btns ;

            // 2.格式化表单列表按钮
            var columns = this.pageParam.tableParam.columns;
            for( var i in columns ){
                var tempOpers = columns[i].opers;
                if( tempOpers && tempOpers.length > 0 ){
                    if(typeof tempOpers == 'string'){
                        tempOpers = (new Function( 'return '+tempOpers))();   
                    } 
                    for(var ii in tempOpers){
                        var temp = tempOpers[ii] ;
                        if(temp.events && typeof temp.events == 'string'){
                            var funcTest = (new Function('return '+temp.events))() ;
                            tempOpers[ii].click = funcTest.click ;
                        }
                    }
                    columns[i].opers = tempOpers ; 
                }  
            }
            // 3.格式化脚本信息
            if(this.pageParam.tableParam.events){
                var events = this.pageParam.tableParam.events ;
                events = (typeof events == 'string')
                                ? (new Function('return '+ events ))() : events ;
                this.pageParam.tableParam.events = events ;                 
            }
            // 4.格式化表单数据
             if(this.pageParam.events ){
                var events = this.pageParam.events ;
                events = (typeof events == 'string')
                                ? (new Function('return '+ events ))() : events ;
                this.pageParam.events = events;
             }      

             this.param = this.pageParam;
            
        }


    }

    
}
</script>
<style scoped>

</style>








