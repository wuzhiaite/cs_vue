
//全局过滤器配置
import {dateFormat} from './base/dateUtil'
import Vue from "vue";

export const filters = {
    normalDateFormat : function(date,fmt){
        return dateFormat.normalFormat(date,fmt);
    },
    textDateFormat : function(text,fmt){
        return dateFormat.textDateFormat(text,fmt);
    }
}


//全局filter注册
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})





