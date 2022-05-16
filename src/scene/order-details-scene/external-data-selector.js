import { createStructuredSelector } from 'reselect'

const user_orders = state => {
  return state.externalData.getIn(['user_orders'])?.toJS() || {}
}

const payment_delay_h5 = state => {
  return state.externalData.getIn(['payment_delay_h5']) || ''
}

export default createStructuredSelector({
  user_orders,
  payment_delay_h5
})
