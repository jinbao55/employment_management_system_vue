import axios from 'axios';

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
          contentType: 'application/json; charset=UTF-8',
        },
        data: params,
        traditional: true
    }).then(res => res.data);
};
// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            token: localStorage.getItem('logintoken')
        },
        data: params,
        traditional: true
    }).then(res => res.data);
};

export {
    loginreq,
    req
}
