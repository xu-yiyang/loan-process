import { stateThunkFactory, externalDataActionCreator, createActionMap, axios } from 'loan-utils';
import { Toast } from 'antd-mobile';
// import { parse } from 'query-string';


export const prepareSceneData = () => ({dispatch}) => {
  // const user_orders = stateThunkFactory(`/loan/app/user_orders/${parse(window.location.search).id}/`)
  const user_orders = stateThunkFactory(`/loan/app/user_orders/${1}`)
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([user_orders()])
      .then(([data]) => {
        Toast.hide()
        dispatch(
          externalDataActionCreator('user_orders', data)
        )
        return Promise.all([
          // stateThunkFactory(`/loan/app/payment_delay_h5/?order_no=${data.order_no}`)()
          stateThunkFactory(`/loan/app/payment_delay_h5`)()
        ])
      })
      .then(([payment_delay_h5]) => {
        if(payment_delay_h5.code === 0) {
          dispatch(
            externalDataActionCreator('payment_delay_h5', payment_delay_h5.data)
          )
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

export const get_contract = (params) => () => {
  console.log(params)
  Toast.loading('', 0)
  return axios.get('/loan/app/get_contract').then(res => {
    if(res.code === 0) {
      Toast.hide()
      window.location.href = res.data
    } else {
      Toast.fail()
    }
  })
}

export const payment_h5 = (params) => () => {
  console.log(params)
  Toast.loading('', 0)
  return axios.get('/loan/app/payment_h5').then(res => {
    if(res.code === 0) {
      Toast.hide()
      window.location.href = res.data
    } else {
      Toast.fail(res.message)
    }
  })
}

export const actions = createActionMap({
  get_contract,
  payment_h5
})
