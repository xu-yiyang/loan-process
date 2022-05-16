import { stateThunkFactory, externalDataActionCreator } from 'loan-utils';
import { Toast } from 'antd-mobile';

const other_no_api_products = stateThunkFactory('/loan/app/other_no_api_products')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([other_no_api_products()])
      .then(([data]) => {
        Toast.hide()
        if(!data.code) {
          dispatch(
            externalDataActionCreator('other_no_api_products', data)
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
