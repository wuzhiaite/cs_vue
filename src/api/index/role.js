
//获更新页面
export function addOrUpdatePage(params){
    return axios({
        url: "/api/role/addOrUpdatePage",
        method: 'post',
        params:params
    })
}

//根据id获取权限
export function getPermission(id){
    return axios({
        url: "/api/user/getPermission/"+id,
        method: 'post',
    })
}

//批量删除
export function removeByIds(params){
    return axios({
        url: "/api/role/removeByIds",
        method: 'post',
        params:params
    })
}



