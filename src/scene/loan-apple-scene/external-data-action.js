import { stateThunkFactory, externalDataActionCreator, createActionMap, axios, history, getEnv } from 'loan-utils';
import { envUrl } from 'constants/index'
import { Toast } from 'antd-mobile';
// import * as $$axios from 'axios'

const getUserBanks = stateThunkFactory('/loan/app/user_banks')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([getUserBanks()])
      .then(([data]) => {
        Toast.hide()
        if(!data.code) {
          dispatch(
            externalDataActionCreator('userBanksList', data)
          )
        } else {
          Toast.fail(data.message);
        }
      })
      .catch(e => {
        Toast.hide()
        Toast.fail(JSON.stringify(e));
      })
  } catch (e) {
    Toast.fail(JSON.stringify(e));
  }
}

export const need_liveness = params => () => {
  Toast.loading('', 0)
  return axios.post('/loan/need_liveness', params).then(res => {
    if(res.code === 0) {
      if(res.data === 0) {
        Toast.hide()
        history.replace('../confirm-order-scene')
      } else {
        // 做活体
        // const instance = $$axios.create();
        // instance.defaults.headers.common['X-ADVAI-KEY'] = X_ADVAI_KEY[getEnv];
        // instance.defaults.headers.common['Content-Type'] = 'application/json';
        axios.get(`/loan/liveness/token?returnUrl=${envUrl[getEnv]}/face-scene`)
        .then(res => {
          Toast.hide()
          if(res.code === 0 && res.data.token) {
            localStorage.setItem('faceToken', res.data.token)
            window.location.href = `https://liveness.central-data.co/photograph-flow?biz_token=${res.data.token}`
          }
          // store.userStore.updateValue('userInfo', res.data.data)
        })
        .catch((err) => {
          Toast.hide()
          console.log(err)
        })
      }
    }
  })
}


export const actions = createActionMap({
  need_liveness
})
