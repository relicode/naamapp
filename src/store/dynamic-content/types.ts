import { AnyAction } from 'redux'

import { DynamicContentResponse } from '../../utils/types/dynamic-content'

export type SetDynamicContentAction = AnyAction & DynamicContentResponse

export type SetSyncedAction = AnyAction & {
  synced: string,
}

export type DynamicContentAction = SetDynamicContentAction | SetSyncedAction

const storePrefix: string = 'dynamicContent'
export const SYNC: string = `${storePrefix}/SYNC`
export const SET_DYNAMIC_CONTENT: string = `${storePrefix}/SET_DYNAMIC_CONTENT`
export const SET_SYNCED: string = `${storePrefix}/SET_SYNCED`
