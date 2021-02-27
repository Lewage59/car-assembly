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

// 获取用户组装车辆信息列表
export function getCustomList(params) {
    return request({
        url: '/car/findAllCustom',
        method: 'get',
        params
    });
}

// 获取官方车辆配置信息
export function getCarParam(params) {
    return request({
        url: '/car/findCarParam',
        method: 'get',
        params
    });
}

// 获取官方车辆配置信息
export function getCarSeriesList(params) {
    return request({
        url: '/car/findAllCarSeries',
        method: 'get',
        params
    });
}

// 获取官方车辆所有配置列表
export function getAllCarParam(params) {
    return request({
        url: '/car/findAllCarParam',
        method: 'get',
        params
    });
}

// 保存用户组装车辆信息
export function saveCustomInfo(data) {
    return request({
        url: '/car/saveCustomInfo',
        method: 'post',
        data
    });
}
