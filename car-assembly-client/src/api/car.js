/**
 * 车辆信息管理api
 */

import request from '@/utils/request';

// 获取官方车辆信息列表
export function getCarModelList(params) {
    return request({
        url: '/car/findAllCarModel',
        method: 'get',
        params
    });
}

// 获取官方车辆信息列表
export function getCustomList(params) {
    return request({
        url: '/car/findAllCustom',
        method: 'get',
        params
    });
}

// 获取官方车辆信息列表
export function getCarParam(params) {
    return request({
        url: '/car/findCarParam',
        method: 'get',
        params
    });
}

