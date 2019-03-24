import { Reducer } from 'redux'

import { AppState, AppStateActions, IS_ONLINE_CHANGE, SET_APP_STATE_STATUS } from './types'

export const initialState: AppState = {
  status: 'active',
  isOnline: false,
}

const reducer: Reducer<AppState, AppStateActions> =
  (state = initialState, action): AppState => {
    const { type, status, isOnline } = action
    switch (type) {
      case SET_APP_STATE_STATUS:
        return { ...state, status }
      case IS_ONLINE_CHANGE:
        return { ...state, isOnline }
      default:
        return state
    }
  }

export default reducer
