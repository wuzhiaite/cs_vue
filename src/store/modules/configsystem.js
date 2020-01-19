
//系统子模块
export default  {
        namespaced:true,
        state:{
            menus:[],    
        
        },
        mutations:{
            setMenus(state,menus){
                console.log('setMenus');
                console.log(menus);
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
                console.log('menusAction');
                console.log(param);
                if(param){
                    context.commit('setMenus',param);
                }
            },
            
        },
   







}
































