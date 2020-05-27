export default {
    //正在登录的用户名
    username : localStorage.getItem("username") 
                ? localStorage.getItem("username") : '',
    token :  localStorage.getItem("token") 
                     ? localStorage.getItem("token") : '',                       
    //系统名称
    systemName : localStorage.getItem("systemName") 
                ? localStorage.getItem("systemName") : 'DEMO',
    //用户信息
    user : localStorage.getItem("user") 
                ? JSON.parse(localStorage.getItem("user"))
                : {   
                    userId : '',
                    username : '',
                    token : '',
                    telephones:'',
                    profilePhoto:'',
                    roles:[],
                    permission:[],
                  },
    screenHeight:window.screen.availHeight - 90,//获取屏幕可用工作区高度
    screenWidth:window.screen.availWidth - 180,//获取屏幕可用工作区宽度         


}





































