import Vue from 'vue'
/**定义全局通用方法 */
let commonUtil = {};

commonUtil.install = function(Vue,options){
    Vue.prototype.formatJSON = function(obj){
        return format.formatJSON(obj);
    }
    Vue.prototype.isJSON = function(str){
        return format.isJSON(str);
    }

}
Vue.use(commonUtil);
export default  commonUtil ;

//格式化json
export const format ={

    formatJSON :function(obj){//将对象中字符串值进行解析
        var temp = {};
        for(var i in obj){
            var str = obj[i];
            if( str && (typeof str == "string") 
                    && ( str.indexOf("{")!= -1 || str.indexOf("[") != -1 ) ){
                str = JSON.parse(obj[i]);
            }
           temp[i] = str ;
        }
        // console.log(temp);
        return temp ;
    },
    isJSON : function (str) {//判断是否为JSON
        console.log(typeof str);
        console.log(typeof str == 'string');
        if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }
            } catch(e) {
                return false;
            }
        }
        return false ;
    },
    jsonToString : function(json){
      return  JSON.stringify(json, function(key, val) {
                if (typeof val === 'function') {
                return val + '';
                }
                return val;
            });
    },
    parseJSON :function(str){
        JSON.parse(str,function(k,v){
            if(v.indexOf && v.indexOf('function') > -1){
               return eval("(function(){return "+v+" })()")
            }
            return v;
          });
    }


}

































