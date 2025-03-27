import request from '@/utils/request'

//查询所有书籍信息
export function getBookList(data) {
  return request({
    url: '/book/list',
    method: 'post',
		data: data
  })
}

//查询某本书籍信息
export function getBookById(query) {
  return request({
    url: `/book/${query}`,
    method: 'get',
		// data: data
  })
}