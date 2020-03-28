
//全局过滤器配置
import {dateFormat} from './base/dateUtil'

export default {
    normalDateFormat : function(date,fmt){
        return dateFormat.normalFormat(date,fmt);
    },
    textDateFormat : function(text,fmt){
        return dateFormat.textDateFormat(text,fmt);
    }
}








