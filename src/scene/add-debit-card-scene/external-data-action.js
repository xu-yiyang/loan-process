import { stateThunkFactory, externalDataActionCreator, createActionMap, axios, history } from 'loan-utils';
import { Toast } from 'antd-mobile';

const support_banks = stateThunkFactory('/loan/app/support_banks')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([support_banks()])
      .then(([data]) => {
        Toast.hide()
        dispatch(
          externalDataActionCreator('supportBanksList', data.data)
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

export const bank_card = (params, search) => () => {
  axios.post('/loan/app/bank_card', params).then(res => {
    if(res.code === 0) {
      if(search.history) {
        history.go(-1)
      } else {
        history.replace('debit-card-scene')
      }
    } else {
      Toast.fail(res.message)
    }
  })
}


export const actions = createActionMap({
  bank_card
})
