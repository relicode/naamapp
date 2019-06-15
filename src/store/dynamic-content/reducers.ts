import { Reducer } from 'redux'

import { DynamicContent } from '../../utils/types/dynamic-content'
import {
  DynamicContentAction,
  SET_DYNAMIC_CONTENT,
  SET_SYNCED,
  SetDynamicContentAction,
} from './types'

export const initialState: DynamicContent = {
  mainInfoScreens: [],
  performers: [],
  performances: [],
  synced: '',
}

const reducer: Reducer<any, DynamicContentAction> =
  (state = initialState, action: DynamicContentAction): DynamicContent => {
    const { type, synced } = action
    switch (type) {
      case SET_DYNAMIC_CONTENT:
        const { mainInfoScreens, performers, performances } = action as SetDynamicContentAction
        const newState = { ...state, synced }
        if (mainInfoScreens) {
          newState.mainInfoScreens = mainInfoScreens
        }
        if (performers) {
          newState.performers = performers
        }
        if (performances) {
          newState.performances = performances
        }

        return newState
      case SET_SYNCED:
        return { ...state, synced }
      default:
        return state
    }
}

export default reducer
