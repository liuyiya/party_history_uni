import request from '@/utils/request'

//查询所有题目信息
export function getQuestionList(query) {
  return request({
    url: '/question/list',
    method: 'get',
		data: query
  })
}

//回答问题
export function answerQuestion(data) {
  return request({
    url: '/userQuestion/answerQuestion',
    method: 'post',
		data: data
  })
}

//开始结束
export function startOrEnd(data) {
  return request({
    url: '/userQuestionStatus/startOrEnd',
    method: 'post',
		data: data
  })
}
