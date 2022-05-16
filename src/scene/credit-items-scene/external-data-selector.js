import { createStructuredSelector } from 'reselect'

const summary = state => {
  return state.externalData.getIn(['home'])
}
export default createStructuredSelector({
  summary
})
