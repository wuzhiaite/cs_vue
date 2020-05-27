//store中状态的唯一提交方法

export default {

    setUsername : ( state , username ) => {
        state.username = username ;
        localStorage.setItem("username",username)
    },
    setUser : ( state , user ) => {
        state.user = user;
        localStorage.setItem("user",JSON.stringify(user));
    },
    setSystemName : ( state , systemName ) => {
        state.systemName = systemName;
    },
    setScreenHeight : (state,height) => {
        state.screenHeight = height;
    },
    setScreenWidth : (state,width ) => state.screenWidth = width ,
    setToken : (state,token) =>{
        state.token = token;
        localStorage.setItem("token",token)
    }  ,


}








