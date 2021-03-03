import request from '@/utils/request'

export function getPanelNum() {
  return request({
    url: '/findPanelNum',
    method: 'get'
  })
}

export function getLevelNum() {
  return request({
    url: '/car/findLevelNum',
    method: 'get'
  })
}

export function getVendorRank() {
  return request({
    url: '/car/findVendorRank',
    method: 'get'
  })
}

