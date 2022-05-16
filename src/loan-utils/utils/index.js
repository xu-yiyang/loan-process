// 判断是否对象
export const isObject = value => {
  if ((Object.prototype.toString.call(value) === '[object Object]')) {
    return true
  }
  return false
}

// 判断是否数组
export const isArray = value => {
  if ((Object.prototype.toString.call(value) === '[object Array]')) {
    return true
  }
  return false
}

// 判断是否字符串
export const isString = value => {
  if ((Object.prototype.toString.call(value) === '[object String]')) {
    return true
  }
  return false
}

// 判断当前是否开发环境
export const isDev = process.env.REACT_APP_ENV === 'development'

// 判断当前是否测试环境
export const isTest = process.env.REACT_APP_ENV === 'test'

// 判断当前是否预发环境
export const isPre = process.env.REACT_APP_ENV === 'preissue'

// 判断当前是否线上环境
export const isProd = process.env.REACT_APP_ENV === 'production'

// 获取当前环境
export const getEnv = process.env.REACT_APP_ENV

// 获取当前用户信息
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('userInfo'))
}

// 获取当前token
export const getToken = () => {
  return localStorage.getItem('token')
}
// 获取当前token
export const getCookie = () => {
  let cookie = document.cookie.split(';');
  let obj = {};
  for (let item of cookie) {
    // join数组转为字符串 trim去除字符串两边的空白符
    let arr = item.split('=').join().trim().split(','); obj[arr[0]] = arr[1];
  }
  return obj
}

export const toThousands = (num,result = '') => {
  if(num>=1000){
      var a=num%1000;
      return toThousands((num-a)/1000,'.'+(a+1000+result).slice(1));
  }
  return num + result;
}