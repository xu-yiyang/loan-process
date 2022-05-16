import axios from 'axios'
// import { Toast } from 'antd-mobile';
import { getToken, getCookie, history } from 'loan-utils';

const ins = axios.create()

ins.interceptors.request.use(
  axiosConfig => {
    axiosConfig.headers['Authorization'] = getToken();
    axiosConfig.headers['X-CSRFToken'] = getCookie().csrftoken;

    axiosConfig.headers['channel'] = 'com.whale.rise.market';
    axiosConfig.headers['version-name'] = '2.1.7';
    axiosConfig.headers['os-type'] = 'h5';
    axiosConfig.headers['app-name'] = 'kreditpaus';
    axiosConfig.headers['channeltype'] = '1';
    axiosConfig.headers['scheme'] = 'main_market';

    return axiosConfig;
  },
  error => {
    console.log('request error', error);
  }
)

ins.interceptors.response.use(({data}) => {
  return data
}, (error) => {
  if (error.response.status === 401) {
    history.replace('login-scene')
  }
  // Toast.info(`${error}`);
  return Promise.reject(error);
})

export const getExternalDataByStepId = (stepId, params = null) => {
  const result = ins.get(`${stepId}`, {params})
  if (result) {
    return result
  } else {
    return Promise.resolve(() => {
      return {
        code: -1,
        data: null,
        message: result,
      }
    })
  }
}

export const stateThunkFactory = stepId => params => {
  return getExternalDataByStepId(stepId, params)
}

// export const commitExternalData = (stepId, params = null) => {
//   return axios.post(`/h5/${stepId}`, params)
// }

export {
  ins as axios
} 
