import { getProfile } from '@/tools/api/login'
import { tagsList } from '@/tools/api/tags'
import DADETHTokenContractAbi from '@/tools/abi/DADToken.abi'
import Web3 from "web3";

// Login the wallet
export function inspectLogin(Web3) {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      // Connect the purse
      window.ethereum.enable().then((res) => {
        setCache('MetaMaskIP',res[0])
        var web3 = new Web3(Web3.givenProvider);
        // Get a wallet signature
        web3.eth.personal.sign("DAD_DSP", res[0], (err, sig) => {
          resolve({ message: 'DAD_DSP', signature: sig, walletAddress: res[0] })
        })
      })
    } else {
      alert("Please install the MetaMask wallet")
      resolve(false)
      return
    }
  })
}

// Access to the cache
export function getCache(name) {
  let data = localStorage.getItem(name);
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
};

// Set the cache
export function setCache(name, data) {
  if (typeof data == 'object') {
    localStorage.setItem(name, JSON.stringify(data))
  } else {
    localStorage.setItem(name, data)
  }
  
  let setKeys = getCache('setKeys') || []
  if (name != 'setKeys' && setKeys.indexOf(name) == -1) {
    setKeys.push(name)
    setCache('setKeys', setKeys)
  }
  return true
};

// Update local cache data
export function updateUserCache() {
  return new Promise((resolve, reject) => {
    getProfile().then((res) => {
      setCache('userInfo', res)
      resolve(res)
    })
  })
}

// Date formatting
export function timeFormatting(time) {
  return (new Date(time).getMonth() + 1 + "").padStart(2, 0) + '/' + (new Date(time).getDate() + "").padStart(2, 0)
};

// Call wallet payment
export function payDad(fromIP, toIP, amount) {
  return new Promise((resolve, reject) => {
    let web3 = new Web3(window.web3.currentProvider)
    // Connect the contract
    let ethContract = new web3.eth.Contract(DADETHTokenContractAbi, '0x6A54eD8A5d1f142C3216010e2dDe892D1B803B0c')
    // pay
    ethContract.methods.transfer(toIP, amount * 1000000000).send({ from: fromIP }, function (error, result) {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    });
  })
}

// File to picture
export function getFileURL(file) {
  let getUrl = null;
  if (window.createObjectURL !== undefined) { // basic
    getUrl = window.createObjectURL(file);
  } else if (window.URL !== undefined) { // mozilla(firefox)
    getUrl = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    getUrl = window.webkitURL.createObjectURL(file);
  }
  return getUrl;
}

// tags
export function tagsRestore(ids) {
  return new Promise((resolve, reject) => {
    tagsList({ page: 0, size: 100 }).then((res) => {
      resolve(res.content.filter((it) => {
        return ids.indexOf(it.id) > -1
      }))
    });
  })
}


export function formatTimes(times = new Date(), format = 'yyyy-MM-dd hh:mm:ss') {
	let timesType = Array.isArray(times); 
	times = timesType ? times : [times];
	times.forEach((item, index, array) => {
		let _item = format;
		item = new Date(item);
		if (format === 'timestamp') {
			_item = item.getTime();
		} else {
			const o = {
				"M+": item.getMonth() + 1,
				"d+": item.getDate(), 
				"h+": item.getHours(),
				"m+": item.getMinutes(),
				"s+": item.getSeconds(), 
				"q+": Math.floor((item.getMonth() + 3) / 3), 
				"S": item.getMilliseconds(), 
				"t": item.getTime(), 
				"w": item.getDay(), 
			};

			if (/(y+)/.test(_item)) {
				_item = _item.replace(RegExp.$1, (item.getFullYear() + "").substr(4 - RegExp.$1.length));
			}

			for (let k in o) {
				if (new RegExp("(" + k + ")").test(_item)) {
					_item = _item.replace(
						RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))
					);
				}
			}
		}
		times[index] = _item;
	})
	return timesType ? times : times[0];
}