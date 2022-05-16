import { createStructuredSelector } from 'reselect'

const userBanksList = state => {
  return state.externalData.getIn(['userBanksList'])?.toJS()
}

export default createStructuredSelector({
  userBanksList
})
