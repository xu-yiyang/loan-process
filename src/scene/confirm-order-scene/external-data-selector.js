import { createStructuredSelector } from 'reselect'

const loan_products = state => {
  return state.externalData.getIn(['loan_products'])?.toJS() || []
}

const loan_amount_period_data = state => {
  return state.externalData.getIn(['loan_amount_period_data'])?.toJS() || []
}

export default createStructuredSelector({
  loan_products,
  loan_amount_period_data
})
