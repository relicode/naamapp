import { AppStateStatus } from 'react-native'
import { AnyAction } from 'redux'

export interface DeviceInfo {
  pushToken: string,
  userId: string,
}

export interface AppState {
  status: AppStateStatus,
  isOnline: boolean,
  deviceInfo?: DeviceInfo,
}

export interface SetAppStateStatusAction extends AnyAction {
  appStateStatus: AppStateStatus,
}

export interface SetIsOnlineAction extends AnyAction {
  isOnline: boolean,
}

export interface SetDeviceInfoAction extends AnyAction {
  deviceInfo: DeviceInfo
}

export type AppStateActions = SetAppStateStatusAction | SetIsOnlineAction | SetDeviceInfoAction

const storePrefix = 'appState'
export const APP_STATE_CHANGE = `${storePrefix}/APP_STATE_CHANGE`
export const IS_ONLINE_CHANGE = `${storePrefix}/IS_ONLINE_CHANGE`
export const DEVICE_INFO_CHANGE = `${storePrefix}/DEVICE_INFO_CHANGE`
export const SET_APP_STATE_STATUS = `${storePrefix}/SET_STATUS`
