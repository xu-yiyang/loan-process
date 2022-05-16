import { createStructuredSelector } from 'reselect'

const apply_loans_data = state => {
  return state.externalData.getIn(['apply_loans_data'])?.toJS() || []
}
const apply_loans_amount = state => {
  return state.externalData.getIn(['apply_loans_amount']) || ''
}

export default createStructuredSelector({
  apply_loans_data,
  apply_loans_amount
})
