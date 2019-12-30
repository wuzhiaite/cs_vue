

export default {
    setUserAction(context,user){//更新用户信息
        if(user){
            context.commit("setUser",user);
        }
        if(user.username){
            context.commit('setUsername',user.username);
        }
    },
    setSystemName(context,systemName){
        context.commit('setSystemName',systemName);
    },
    setScreenHeight({commit},height){
        return commit('setScreenHeight',height);   
   }


}










