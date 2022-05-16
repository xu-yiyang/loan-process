import { stateThunkFactory, externalDataActionCreator } from 'loan-utils';
import { Toast } from 'antd-mobile';

const user_orders = stateThunkFactory('/loan/app/user_orders')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([user_orders()])
      .then(([data]) => {
        Toast.hide()
        if(!data.code) {
          console.log(data,'datadata')
          dispatch(
            externalDataActionCreator('user_orders', data)
          )
        } else {
          Toast.fail(data.message || data.messages);
        }
      })
      .catch(() => {
        Toast.hide()
        // Toast.fail(JSON.stringify(e));
      })
  } catch (e) {
    Toast.fail(JSON.stringify(e));
  }
}
