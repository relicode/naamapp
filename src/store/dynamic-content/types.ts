import { AnyAction } from 'redux'

export interface HeaderImage {
  url: string,
  width: number,
  height: number,
}

export interface MainInfoPage {
  content: string,
  createdAt: string,
  headerImage: HeaderImage,
  title: string,
  updatedAt: string,
  order: number,
}

export interface DynamicContent {
  mainInfoPages: MainInfoPage[],
  synced: string,
}

export interface TrimmedDynamicContent {
  mainInfoPages: MainInfoPage[],
  lastSynced: string,
}

export type TrimmedDynamicContentAction = TrimmedDynamicContent & AnyAction

export interface SetMainInfoPagesAction extends AnyAction {
  mainInfoPages: MainInfoPage[],
}

export interface SetSyncAction extends AnyAction {
  lastSynced: string,
}

export type DynamicContentAction = SetMainInfoPagesAction | SetSyncAction | TrimmedDynamicContentAction

const storePrefix: string = 'dynamicContent'
export const SYNC: string = `${storePrefix}/SYNC`
export const SET_DYNAMIC_CONTENT: string = `${storePrefix}/SET_DYNAMIC_CONTENT`
export const SET_LAST_SYNCED: string = `${storePrefix}/SET_LAST_SYNCED`
