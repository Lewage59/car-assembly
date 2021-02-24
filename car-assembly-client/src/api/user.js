/**
 * 用户信息管理api
 */

import request from '@/utils/request';

// 用户登陆
export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    });
}

// 获取用户信息
export function getInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    });
}

// 创建用户
export function createUser(data) {
    return request({
        url: '/user/createUser',
        method: 'post',
        data
    });
}

// 更新用户信息
export function updateUserInfo(data) {
    return request({
        url: '/user/update',
        method: 'post',
        data
    });
}

// 上传用户头像

