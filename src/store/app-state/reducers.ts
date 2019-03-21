import { AnyAction, Reducer } from 'redux'

import { AppState, SET_APP_STATE_STATUS } from './types'

export const initialState: AppState = {
  status: 'active',
}

const reducer: Reducer<AppState, AnyAction> =
  (state = initialState, action): AppState => {
    const { type, status } = action
    switch (type) {
      case SET_APP_STATE_STATUS:
        return { ...state, status }
      default:
        return state
    }
  }

export default reducer
