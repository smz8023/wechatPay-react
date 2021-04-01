import axios, { AxiosResponse } from 'axios';

export const HOST = '/api/';

const request = axios.create({
    baseURL: HOST,
    withCredentials: true,
    validateStatus: (s: number) => s >= 200 && s < 300,
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token');
    token = 'eyJhbGciOiJIUzUxMiJ9.eyJuaWNrbmFtZSI6Imlob3BlZnVsIMKwIiwiaWQiOjE0LCJhdmF0YXIiOiJodHRwczovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL1EwajRUd0dUZlRLdWljc3N4N1BpYjBRWEhmZG9wN2ZOZzhpYnVkWXVFVUlPM25DRGRRVDlYeXN5MDRHQWVWTTJEdEthT3BxQ3NmbFlVVUx4b1dzQ00zYkZRLzEzMiIsImV4cCI6MTYxNDc1MjIyOSwib3BlbmlkIjoib1ZwM1c1QWlnU0U2OC1WNXF5bmtXc29KaVBORSJ9.oT7rZuPxuW0mYo8RY-ItNkjF5KSjzUajmO1LpDCv4u6_Vj3j4EDws-9dQSMQvbocQEfV-Ba3P7523TUUyNjQNw';
    config.headers['Content-Type'] = 'application/json';
    config.headers['platform'] = 'PC';
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
