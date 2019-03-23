import { AnyAction } from 'redux'

export type SetMainInfoPagesAction = AnyAction & DynamicContent

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
  synced: string,     // 2019-03-16T20:14:23.230Z
}

const storePrefix: string = 'dynamicContent'
export const SYNC: string = `${storePrefix}/SYNC`
export const SET_MAIN_INFO_PAGES: string = `${storePrefix}/SET_MAIN_INFO_PAGES`
