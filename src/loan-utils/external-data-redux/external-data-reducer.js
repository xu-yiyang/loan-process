import { fromJS, Map } from 'immutable'
import { CREATE_EXTERNAL_DATA, EXTERNAL_DATA_CHANGE, INSERT } from './constant'

export const createExternalDataReducer = prepareState => (state = fromJS(prepareState), action) => {
  switch (action.type) {
    case CREATE_EXTERNAL_DATA: {
      let { externalDataKey, externalDataRes } = action.payload
      return state.set(externalDataKey, fromJS(externalDataRes))
    }
    case EXTERNAL_DATA_CHANGE: {
      let { externalDataKey, externalDataResult } = action.payload
      return state.setIn(externalDataKey, fromJS(externalDataResult))
    }
    case INSERT: {
      let { key, data } = action.payload
      if (!Array.isArray(key)) {
        throw new Error('传入的 key 不是数组')
      }
      const dataKey = state.getIn(key)
      if (dataKey) {
        return state.setIn(key, dataKey.merge(Map(data)))
      } else {
        return state.setIn(key, data)
      }
    }
    default:
      return state
  }
}
