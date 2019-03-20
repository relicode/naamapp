import { AnyAction } from 'redux'

export interface SetMainInfoPagesAction extends AnyAction {
  mainInfoPages: MainInfoPage[],
}

export interface HeaderImage {
  url: string,
  width: number,
  height: number,
}

export interface MainInfoPage {
  // [x: string]: string | number | undefined
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

const storePrefix: string = 'pages'
export const SYNC: string = `${storePrefix}/SYNC`
export const SET_MAIN_INFO_PAGES: string = `${storePrefix}/SET_MAIN_INFO_PAGES`
