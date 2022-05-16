import { combineReducers, applyMiddleware } from 'redux'
import { createExternalDataReducer } from '../external-data-redux/external-data-reducer'
import thunkMiddleware from 'redux-thunk'

export const createRootReducer = (prepareState) =>
  combineReducers({
    externalData: createExternalDataReducer(prepareState),
  })

export const middlewareWithHashHistory = applyMiddleware(thunkMiddleware)