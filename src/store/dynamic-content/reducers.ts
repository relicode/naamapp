import { AnyAction, Reducer } from 'redux'

import { DynamicContent, DynamicContentAction, SET_DYNAMIC_CONTENT, SET_LAST_SYNCED } from './types'

export const initialState: DynamicContent = {
  mainInfoPages: [],
  lastSynced: '',
}

const reducer: Reducer<DynamicContent, AnyAction> =
  (state = initialState, action: DynamicContentAction): DynamicContent => {
    const { type, mainInfoPages, lastSynced } = action
    switch (type) {
      case SET_DYNAMIC_CONTENT:
        return { ...state, mainInfoPages, lastSynced }
      case SET_LAST_SYNCED:
        return { ...state, lastSynced }
      default:
        return state
    }
  }

export default reducer
