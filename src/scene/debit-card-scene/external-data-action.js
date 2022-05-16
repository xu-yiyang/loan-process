import { stateThunkFactory, externalDataActionCreator, createActionMap } from 'loan-utils';
import { Toast } from 'antd-mobile';

const getUserBanks = stateThunkFactory('/loan/app/user_banks')

export const prepareSceneData = () => ({ dispatch }) => {
  Toast.loading('Menuat, tidak ada konten...', 0);
  try {
    return Promise.all([getUserBanks()])
      .then(([data]) => {
        Toast.hide()
        dispatch(
          externalDataActionCreator('userBanksList', data)
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


export const actions = createActionMap({
})
