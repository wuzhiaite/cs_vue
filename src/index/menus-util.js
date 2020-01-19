
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
        children
      } = router;
      if (children && children instanceof Array) {
        children = formatRoutes(children,basePath);
      }

      let fmRouter = {
        path: path,
        component :function(){
           if(realPath){
            return require('./components/'+realPath) ;
           }else{
               return '';
           }       
        },
        name: name,
        iconCls: iconCls,
        meta: meta,
        children: children
      };
      fmRoutes.push(fmRouter);
    })
    return fmRoutes;
  }
  















