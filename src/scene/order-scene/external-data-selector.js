import { createStructuredSelector } from 'reselect'

const user_orders = state => {
  return state.externalData.getIn(['user_orders'])?.toJS() || []
}


export default createStructuredSelector({
  user_orders
})
