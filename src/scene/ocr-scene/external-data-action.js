import { stateThunkFactory, externalDataActionCreator, createActionMap, axios, history } from 'loan-utils';
import { Toast } from 'antd-mobile';

const ossUpload = stateThunkFactory('/api/v1/upload/photos/token')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([ossUpload()])
      .then(([ossUpload]) => {
        Toast.hide()
        dispatch(
          externalDataActionCreator('ossUpload', ossUpload)
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

export const ktp_ocr = (params, type, text) => dispatch => {
  if(type === 'face') {
    return axios.post('/loan/app/ktp_ocr', params).then(res => {
      if(res?.data?.null_list?.length > 0) {
        Toast.fail(text.ocrScene_toast_fail)
      } else {
        Toast.hide()
        dispatch(
          externalDataActionCreator('phoneInfo', res)
        )
      }
    })
  } else {
    Toast.hide()
    dispatch(
      externalDataActionCreator('idcard_image_hand', params.ktp_photo_url)
    )
    return Promise.resolve()
  }
}

export const user_ktp = (params) => () => {
  Toast.loading('', 0)
  return axios.post('/loan/app/user_ktp', params).then(res => {
    Toast.hide()
    if(res.code === 0) {
      history.replace('base-info-scene')
    } else {
      Toast.fail(res.message)
    }
  })
}

export const actions = createActionMap({
  ktp_ocr,
  user_ktp
  // getStep
})
