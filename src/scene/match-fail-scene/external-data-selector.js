import { createStructuredSelector } from 'reselect'

const other_no_api_products = state => {
  return state.externalData.getIn(['other_no_api_products'])?.toJS() || []
}


export default createStructuredSelector({
  other_no_api_products
})
