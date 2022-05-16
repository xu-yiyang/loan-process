import { createStructuredSelector, createSelector } from 'reselect'

const supportBanks = state => {
  return state.externalData.getIn(['supportBanksList'])
}

export const supportBanksList = createSelector(
  supportBanks,
  (data) => {
    const list = data?.toJS()?.map(item => {
      return {
        label: item.bankName,
        value: item.bankCode,
      }
    })
    return list
  }
)

export default createStructuredSelector({
  supportBanksList
})
