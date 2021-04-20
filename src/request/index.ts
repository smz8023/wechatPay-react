import axios, { AxiosResponse } from 'axios';

export const HOST = 'https://zhangpy-whisperings-mini.f.wmeimob.com/wx';

const request = axios.create({
    baseURL: HOST,
    withCredentials: true,
    validateStatus: (s: number) => s >= 200 && s < 300,
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json';
    if (token) {
        config.headers['Authorization'] = token;
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

request.interceptors.response.use(
    (res: AxiosResponse) => {
        return res.data;
    },
    function (error) {
        const { response } = error;
        // eslint-disable-next-line no-console
        console.log('err', response, response?.status, response?.status > 200);
        if (response?.status > 200) {
            console.log('接口报错了');
        }
        // 对请求错误做些什么
        return {};
        // return Promise.reject(error);
    },
);

const fetchs = {
    get(url: string, data?: any, options = {}) {
        return request(url, { method: 'GET', params: data, ...options });
    },
    post(url: string, data?: any, options = {}) {
        return request(url, { method: 'POST', data, ...options });
    },
    put(url: string, data?: any, options = {}) {
        return request(url, { method: 'PUT', data, ...options });
    },
    del(url: string, data?: any, options = {}) {
        return request(url, { method: 'DELETE', data, ...options });
    },
    request,
};
export const get = (url: string, data?: any, options = {}) => {
    return request(url, { method: 'GET', params: data, ...options });
};
export const post = (url: string, data?: any, options = {}) => {
    return request(url, { method: 'POST', data, ...options });
};
export const put = (url: string, data?: any, options = {}) => {
    return request(url, { method: 'PUT', data, ...options });
};
export const del = (url: string, data?: any, options = {}) => {
    return request(url, { method: 'DELETE', data, ...options });
};

// mock.init(request)

export default fetchs;
