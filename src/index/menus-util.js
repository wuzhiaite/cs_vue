import axios from 'axios';
import {mapGetters,mapMutations} from  'vuex';

const basePath = './components/'

export const formatRoutes = (routes)=> {
  // debugger
    let fmRoutes = [];
    routes.forEach(router=> {
      let {
        path,
        name,
        meta,
        iconCls,
        realPath,
        desc,
        hidden,
        children
      } = router;
      if (children && children instanceof Array) {
        children = formatRoutes(children,basePath);
      }

      let fmRouter = {
        path: path,
        component :function(resolve){
           if(realPath){
             require(['./components/'+realPath+'.vue'],resolve) ;
           }       
        },
        name: name,
        iconCls: iconCls,
        meta: meta,
        desc:desc,
        hidden:hidden,
        children: children
      };
      fmRoutes.push(fmRouter);
    })
    return fmRoutes;
  }
  

/**
 * 初始化菜单
 */
export const initMenus = function(){
   axios.post("/api/sys/menus/getList")
        .then(res => {
            if(res.status == 200 && res.data.code == 1){
                  var csMenus = res.data.result ; 
                  this.$store.dispatch("cs/setMenusAction",csMenus);
                  csMenus = formatRoutes( csMenus );
                  this.$router.addRoutes(csMenus);
            }else{
              this.$message({
                type:"error",
                message:'查询失败，请稍后重试！！！'
              });
            }
        });
}














