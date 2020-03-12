
const basePath = './components/'

export const formatRoutes = (routes)=> {
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
  















