/**
 * 品牌信息管理api
 */
import request from '@/utils/request';

// 获取品牌信息列表
export function getBrandList(params) {
    return request({
        url: '/brand/findBrand',
        method: 'get',
        params
    });
}