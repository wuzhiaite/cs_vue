
//系统子模块
export default  {
        namespaced:true,
        state:{
            menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [],    
        },
        mutations:{
            setMenus(state,menus){
                state.menus = menus;
                localStorage.setItem("menus",JSON.stringify(menus))
            },
           
        },
        getters:{
            getMenus( context ){
                return context.menus;
            },
            
        
        },
        actions:{
            //菜单动作
            setMenusAction(context,param){
                if(param){
                    context.commit('setMenus',param);
                }
            },
            
        },
   







}
































