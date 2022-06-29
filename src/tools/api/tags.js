
import service from "./request";

export function tagsList(params) {
  return service({
    url: '/tags',
    method: 'get',
    params,
  })
}

export function tagsView(params, id) {
  if (!id) return '缺少参数id'
  return service({
    url: `/tags/${id}/view`,
    method: 'get',
    params,
  })
}

export function tagsIncrease(data) {
  return service({
    url: '/tags',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  })
}