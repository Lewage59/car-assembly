/**
 * 车辆信息管理api
 */

import request from '@/utils/request'

// 获取官方车辆信息列表
export function getCarModelList() {
  return request({
    url: '/car/findAllCarModel',
    method: 'get'
  })
}
