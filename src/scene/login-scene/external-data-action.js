import { axios, createActionMap, history } from 'loan-utils';
import { Toast } from 'antd-mobile';


export const sendVerification = params => () => {
  return axios.post('/api/v1/verification/send_code/', params)
}

const login = (params, text) => () => {
  return axios.post('/api/v1/users/sms_login', params).then(res => {
    localStorage.setItem('userInfo', JSON.stringify(res))
    localStorage.setItem('token', res.token)
    Toast.success(text.loginScene_login_success, 1, () => {
      history.replace('credit-items-scene')
    })
  }, error => {
    Toast.fail(error?.response?.data?.error_message)
  })
}

export const actions = createActionMap({
  sendVerification,
  login
  // changeHandle: (dataId, params) => dispatch => {
  //   dispatch(changeExternalDataActionCreator([...dataId], params))
  // },
})
