import { createStructuredSelector } from 'reselect'

const ossUpload = state => {
  return state.externalData.getIn(['ossUpload'])?.toJS()
}

const phoneInfo = state => {
  return state.externalData.getIn(['phoneInfo', 'data'])?.toJS()
}

const idcard_image_hand = state => {
  return state.externalData.getIn(['idcard_image_hand'])
}

export default createStructuredSelector({
  ossUpload,
  phoneInfo,
  idcard_image_hand
})
