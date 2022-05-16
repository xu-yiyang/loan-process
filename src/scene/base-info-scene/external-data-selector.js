import { createStructuredSelector } from 'reselect'

const inputItem = state => {
  return state.externalData.getIn(['baseInfoInputItem', 'data', 'other_fields'])?.toJS()
}

const relation_list = state => {
  const data = state.externalData.getIn(['baseInfoInputItem', 'data', 'relation_list'])?.toJS() || []
  const item = data.map(item => {
    return {
      label: item,
      value: item,
    }
  })
  return item
}

const loancontacts_set = state => {
  return state.externalData.getIn(['baseInfoInputItem', 'data', 'loancontacts_set'])?.toJS()
}

export default createStructuredSelector({
  inputItem,
  relation_list,
  loancontacts_set
})
