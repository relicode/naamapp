import { AnyAction, Reducer } from 'redux'

import { PagesState, SET_MAIN_PAGES } from './types'

export const initialState: PagesState = {
  mainPages: [],
  synced: '',
}

const pagesReducer: Reducer<PagesState, AnyAction> = (state: PagesState = initialState, action): PagesState => {
    const { type, mainPages } = action
    switch (type) {
      case SET_MAIN_PAGES:
        return { ...state, mainPages }
      default:
        return state
    }
  }

export default pagesReducer
