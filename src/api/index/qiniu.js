
export function getToken() {
    return axios({
        url: '/api/upload/qiniu/token', // 假地址 自行替换
        method: 'get'
    })
}


