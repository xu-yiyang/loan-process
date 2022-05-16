import { bindActionCreators } from 'redux'
export const createActionMap = actionMap => dispatch => {
  return {
    ...bindActionCreators(
      {
        ...actionMap,
      },
      dispatch,
    )
  }
}
