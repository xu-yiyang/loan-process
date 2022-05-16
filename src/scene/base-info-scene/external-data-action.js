import { stateThunkFactory, externalDataActionCreator, createActionMap, axios, history } from 'loan-utils';
import { Toast } from 'antd-mobile';

const getBaseInfoInputItem = stateThunkFactory('/loan/app/params')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([getBaseInfoInputItem()])
      .then(([baseInfoInputItem]) => {
        Toast.hide()
        dispatch(
          externalDataActionCreator('baseInfoInputItem', baseInfoInputItem)
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
