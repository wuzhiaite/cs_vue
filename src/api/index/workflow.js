
export function startprocess() {
    return axios({
        url: '/api/activiti/task/startprocess',
        method: 'post'
    })
}

export function completeTask() {
    return axios({
        url: '/api/activiti/task/complete',
        method: 'post'
    })
}

/**
 * 获取请假申请表单数据
 * @returns {*}
 */
export function getLeaveRequestFormData(params){
    return axios({
        url: '/api/pagelist/commonpage/de4a',
        method: 'post',
        params:params,
    })
}
