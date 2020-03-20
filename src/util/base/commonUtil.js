
export const format ={

    formatJSON :function(obj){//将对象中字符串值进行解析
        var temp = {};
        for(var i in obj){
            var str = obj[i];
            if( str && ( str.indexOf("{")!= -1 || str.indexOf("[") != -1 ) ){
                str = JSON.parse(obj[i]);
            }
           temp[i] = str ;
        }
        console.log(temp);
        return temp ;
    }





}

































