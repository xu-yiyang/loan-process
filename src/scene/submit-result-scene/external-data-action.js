import { externalDataActionCreator, createActionMap, axios, history } from 'loan-utils';
import { Toast } from 'antd-mobile';

export const prepareSceneData = () => ({ dispatch, getState }) => {
  const state = getState()
  dispatch(
    externalDataActionCreator('apply_loans_data', state.externalData.getIn(['apply_loans_data'])?.toJS())
  )
  try {
    return Promise.all()
  } catch (e) {
    Toast.fail(JSON.stringify(e));
  }
}


export const user_basic = (params, search) => () => {
  console.log(search);
  axios.post('/loan/app/user_basic', params).then(res => {
    if(res.info) {
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
  user_basic
})
