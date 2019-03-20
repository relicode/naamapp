import { AnyAction, Reducer } from 'redux'

import { DynamicContent } from '../../store/dynamic-content/types'
import { SET_MAIN_PAGES } from './types'

export const initialState: DynamicContent = {
  mainInfoPages: [],
  synced: '',
}

const pagesReducer: Reducer<DynamicContent, AnyAction> =
  (state: DynamicContent = initialState, action): DynamicContent => {
    const { type, mainInfoPages } = action
    switch (type) {
      case SET_MAIN_PAGES:
        return { ...state, mainInfoPages }
      default:
        return state
    }
  }

export default pagesReducer
