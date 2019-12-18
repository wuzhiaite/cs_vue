//日期格式化
export const dateFormat = {
    
      normalFormat : function(date,fmt){
            if(!date){return ''; }
            if(typeof date === 'string'){
                date = new Date(date);
            }   
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            }
            for (var k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                var str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : str)
                }
            }
            return fmt;
     
    },
    textDateFormat : function(text,fmt){//对文字中日期进行抽出格式化
        var regExp = /\d{4}-\d{1,2}-\d{1,2}/ig;
        var result = text.match(regExp);
        for(var i in result){
            var temp = result[i];
            var fd = this.normalFormat(temp,fmt);
            text = text.replace(new RegExp(temp,'g'),fd);
        }  
        return text;
    }

}

//字符串转换通用方法
export const strFormat = {
    convertStockcode: function(data){//股票代码进行转换
        var index = data.lastIndexOf(".");
        var preStr = data.substring(0,index);
        var subStr = data.substring(index + 1);
        var temp = '';
        switch(subStr){
            case 'HK': temp = 'E' ; break;
            case 'SZ': temp = 'A' ; break;
        }
        return temp + preStr;
    }







}
















