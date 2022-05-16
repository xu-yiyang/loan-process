import { stateThunkFactory, externalDataActionCreator, createActionMap, axios, history } from 'loan-utils';
import { Toast } from 'antd-mobile';

const loan_products = stateThunkFactory('/loan/app/loan_products')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([loan_products()])
      .then(([data]) => {
        Toast.hide()
        if(!data.code) {
          dispatch(
            externalDataActionCreator('loan_products', data)
          )
        } else {
          Toast.fail(data.msg);
          history.replace('match-fail-scene')
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
// 获取协议
export const get_contract = params => () => {
  console.log(params)
  return axios.get('/loan/app/get_contract').then(res => {
    // eslint-disable-next-line
    if(res.code == 0) {
      window.location.href = res.data
    }
  })
}
// 调整额度
export const loan_amount_period = params => dispatch => {
  Toast.loading('', 0)
  return new Promise((resolve, reject) => {
    axios.post('/loan/app/loan_amount_period', params).then(res => {
      Toast.hide()
      if(!res.code) {
        dispatch(
          externalDataActionCreator('loan_amount_period_data', res)
        )
        resolve(res)
      } else {
        reject(res)
      }
    })
  });
}
// 提交
export const apply_loans = (params, loan_amount) => dispatch => {
  Toast.loading('', 0)
  return axios.post('/loan/app/apply_loans', params).then(res => {
    Toast.hide()
    if(!res.code) {
      dispatch(
        externalDataActionCreator('apply_loans_data', res)
      )
      dispatch(
        externalDataActionCreator('apply_loans_amount', loan_amount)
      )
      history.replace('submit-result-scene')
    }
  })
}


export const actions = createActionMap({
  get_contract,
  loan_amount_period,
  apply_loans
})
