import { stateThunkFactory, externalDataActionCreator, axios, createActionMap, history } from 'loan-utils';
import { Toast } from 'antd-mobile';

const home = stateThunkFactory('/api/v1/home')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([home()])
      .then(([home]) => {
        Toast.hide()
        dispatch(
          externalDataActionCreator('home', home.data)
        )
      })
      .catch(e => {
        Toast.hide()
        Toast.fail(JSON.stringify(e));
      })
  } catch (e) {
    Toast.fail(JSON.stringify(e));
  }
}

export const getStep = params => () => {
  return axios.post('/loan/app/user_info_completeness', params).then(res => {
    if(res.code === 0) {
      const data = res.data
      sessionStorage.setItem('step', data.step)
      if(data.step === 0) {
        history.push('/ocr-scene')
      } else if(data.step === 1) {
        history.push('/base-info-scene')
      } else if(data.step === 2) {
        history.push('/debit-card-scene')
      } else if(data.step === 3) {
        history.push('/loan-apple-scene')
      }
    }
  })
}

export const actions = createActionMap({
  getStep
})
