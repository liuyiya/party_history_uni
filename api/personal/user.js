import upload from '@/utils/upload'
import request from '@/utils/request'

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 查询用户个人信息
export function getUserProfile(query) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
		data: query
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/oss/upload',
    name: data.name,
    filePath: data.filePath
  })
}

//获取积分排行榜
export function getUserPointList(query) {
  return request({
    url: '/user/getUserPointList',
    method: 'get',
		data: query
  })
}

//获取我的积分记录
export function getMyPointHistory(query) {
  return request({
    url: '/userQuestion/getMyPointHistory',
    method: 'get',
		data: query
  })
}