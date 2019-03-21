import { AppStateStatus } from 'react-native'
import { AnyAction } from 'redux'

export interface AppState {
  status: AppStateStatus,
}

export interface SetAppStateStatusAction extends AnyAction {
  appStateStatus: AppStateStatus,
}

const storePrefix: string = 'appState'
export const APP_STATE_CHANGE: string = `${storePrefix}/APP_STATE_CHANGE`
export const SET_APP_STATE_STATUS: string = `${storePrefix}/SET_STATUS`
