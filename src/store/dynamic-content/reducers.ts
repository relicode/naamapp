import { AnyAction, Reducer } from 'redux'

import { DynamicContent, SET_MAIN_INFO_PAGES } from './types'

export const initialState: DynamicContent = {
  mainInfoPages: [],
  synced: '',
}

const reducer: Reducer<DynamicContent, AnyAction> =
  (state = initialState, action): DynamicContent => {
    const { type, mainInfoPages, synced } = action
    switch (type) {
      case SET_MAIN_INFO_PAGES:
        return { ...state, mainInfoPages, synced }
      default:
        return state
    }
  }

export default reducer
