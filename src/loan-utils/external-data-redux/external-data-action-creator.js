import {
  CREATE_EXTERNAL_DATA,
  EXTERNAL_DATA_REQUEST,
  EXTERNAL_DATA_CHANGE,
  INSERT,
} from './constant'

export const externalDataActionCreator = (stepId, res) => {
  return {
    type: CREATE_EXTERNAL_DATA,
    payload: {
      externalDataKey: stepId,
      externalDataRes: res,
    },
  }
}

export const changeExternalDataActionCreator = (key, res) => {
  return {
    type: EXTERNAL_DATA_CHANGE,
    payload: {
      externalDataKey: key,
      externalDataResult: res,
    },
  }
}

export const insert = (key, data) => {
  return {
    type: INSERT,
    payload: {
      key,
      data,
    },
  }
}

export const prepareExternalDataWithPush = sceneId => {
  return {
    type: EXTERNAL_DATA_REQUEST,
    payload: {
      sceneId,
    },
  }
}
