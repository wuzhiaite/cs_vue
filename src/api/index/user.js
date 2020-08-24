
//获取权限列表
export function permissionList(){
    return "/api/sys/menus/getPermissionList";
}

//根据id获取权限
export function getPermission(id){
    return "/api/user/getPermission/"+id;
}

