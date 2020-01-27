
//系统子模块
export default  {
        namespaced:true,
        state:{
            menus:[],    
        
        },
        mutations:{
            setMenus(state,menus){
                state.menus = menus;
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
































