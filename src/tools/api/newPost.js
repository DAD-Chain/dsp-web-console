
import service from "./request";

export function adsList(params) {
  return service({
    url: '/ads',
    method: 'get',
    params,
  })
}

export function adsIncrease(params, image) {
  let data = new FormData();
  data.append('image', image); 
  return service({
    url: '/ads',
    method: 'post',
    params,
    data,
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
  })
}

export function adsListDetail(params, id) {
  if (!id) return '缺少参数id'
  return service({
    url: '/ads/' + id,
    method: 'get',
    params,
  })
}

export function adsModify(params, image) {
  let data = new FormData();
  if(typeof image != 'string'){
    data.append('image', image); 
  }
  return service({
    url: '/ads/' + params.id,
    method: 'post',
    params,
    data,
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
  })
}

export function adsClick(params, id) {
  if (!id) return '缺少参数id'
  return service({
    url: '/ads/' + id + '/click',
    method: 'get',
    params,
  })
}

export function adsEnd(data, id) {
  if (!id) return '缺少参数id'
  return service({
    url: '/ads/' + id + '/end',
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

export function adsStat(params) {
  return service({
    url: '/ads/stat',
    method: 'get',
    params,
  })
}

export function dspConfig(params) {
  return service({
    url: '/dsp/config',
    method: 'get',
    params,
  })
}
