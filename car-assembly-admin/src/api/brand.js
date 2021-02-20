/**
 * 汽车品牌管理api
 */
import request from '@/utils/request'

// 获取品牌列表
export function getBrandList(params) {
  return request({
    url: '/brand/findBrand',
    method: 'get',
    params
  })
}

// 添加品牌
export function createBrand(data) {
  return request({
    url: '/brand/createBrand',
    method: 'post',
    data
  })
}

// 删除品牌
export function deleteBrand(id) {
  return request({
    url: '/brand/deleteBrand',
    method: 'get',
    params: {
      id
    }
  })
}

// 更新品牌
export function updateBrand(data) {
  return request({
    url: '/brand/updateBrand',
    method: 'post',
    data
  })
}

// 获取品牌系列列表
export function getSeriesList(id) {
  return request({
    url: '/brand/findSeries',
    method: 'get',
    params: {
      brandId: id
    }
  })
}
