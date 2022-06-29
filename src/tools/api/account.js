
import service from "./request";

export function authProfile(params){
  return service({
    url: '/auth/profile',
    method: 'get',
    params,
  })
}

export function walletTransfers(params){
  return service({
    url: '/wallet/transfers',
    method: 'get',
    params,
  })
}

export function putProfile(data) {
  return service({
    url: '/auth/profile',
    method: 'put',
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

export function walletDepositDAD(data) {
  return service({
    url: '/wallet/deposit-dad',
    method: 'post',
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