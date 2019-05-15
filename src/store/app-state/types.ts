import { AppStateStatus } from 'react-native'
import { AnyAction } from 'redux'

export interface AppState {
  status: AppStateStatus,
  isOnline: boolean,
}

export interface SetAppStateStatusAction extends AnyAction {
  appStateStatus: AppStateStatus,
}

export interface SetIsOnlineAction extends AnyAction {
  isOnline: boolean,
}

export type AppStateActions = SetAppStateStatusAction | SetIsOnlineAction

const storePrefix: string = 'appState'
export const APP_STATE_CHANGE: string = `${storePrefix}/APP_STATE_CHANGE`
export const IS_ONLINE_CHANGE: string = `${storePrefix}/IS_ONLINE_CHANGE`
export const SET_APP_STATE_STATUS: string = `${storePrefix}/SET_STATUS`
