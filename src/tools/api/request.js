
import axios from 'axios';
import { message } from 'ant-design-vue';
message.config({
  maxCount:1
})

const service = axios.create({
   baseURL: 'https://dspv2.dad.one/api',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {},
  timeout: 60000,
  withCredentials: false, 
})

service.interceptors.request.use(
  config => {
		const EDToken = localStorage.getItem("EDToken"); 
		config.headers.common['EDToken'] = EDToken;
    
		if (config.data || config.params) {
			let data = config.data || config.params;
			let message = [];
			for (let key in data) {
				if (typeof data[key] === 'object') {
					for (let key2 in data[key]) {
						if (data[key][key2] === '' || data[key][key2] === undefined || data[key][key2] === null) {
							message.push(key2);
							delete data[key][key2];
						}
					}
				}
				if (data[key] === '' || data[key] === undefined || data[key] === null || key === 'times') {
					message.push(key);
					delete data[key];
				}
			}
			
			if(message.length > 0) console.warn('api:' + config.url + '，params:', message);
		}
    
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
)

service.interceptors.response.use((response) => {
  if(response.data.error){
    message.error('Session expired, please login again .');
    setTimeout(() => {
      localStorage.clear();
      location.href = location.origin
    }, 2000);
    return response.data.error;
  }else{
    return response.data.data;
  }
  if (response.data && response.status != 200) {
    let code = response.status;
    if (/401$/.test(code) || /403$/.test(code)) {
      message.error('The login is abnormal and will be automatically logged out after 3 seconds！');
      setTimeout(() => {
        location.href = process.env.VUE_APP_CURRENTMODE === 'dev' ? location.origin + '/#/login' : location.origin;
      }, 3000)
      return Promise.reject(response);
    } else if (/404$/.test(code)) {
      message('The interface you requested is closed！' + response.data.msg);
      return Promise.reject(response);
    } else if (/Network Error$/.test(code)) {
      message('Please check whether your current network status is connected！');
      return Promise.reject(response);
    } else if (/timeout/.test(code)) {
      message('Your request has timed out. Please check the network and try again later！');
      return Promise.reject(response);
    } else if (code == 45000 || code == 40000) {
      message(response.data.msg);
      return Promise.reject(response);
    } else {
      return response;
    }
  } else {
    return response.data;
  }
},
  (error) => {
    // message.error('The network is busy, please try again later!');
    // location.href = location.origin
    return Promise.reject(error);
  }
)

export default service;
