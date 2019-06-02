import { AnyAction } from 'redux'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const PERFORMANCE_LOCATIONS = ['Riihi', 'Navetta', 'Sideshow-teltta'] as const
export type PerformanceLocationName = typeof PERFORMANCE_LOCATIONS[number]
export type LocationPerformances = {
  [x in PerformanceLocationName]?: PerformanceRecord[]
}

export const DYNAMIC_CONTENT_TYPES = ['mainInfoPage', 'performer', 'performance'] as const
export type DynamicContentTypes = typeof DYNAMIC_CONTENT_TYPES[number]

export type DynamicContentFieldTypes = MainInfoPageFields | PerformerFields | PerformanceFields
export type DynamicContentRecord = MainInfoPageRecord | PerformerRecord | PerformanceRecord

export interface HeaderImage {
  height: number,
  url: string,
  width: number,
}

export interface RecordFields {
  createdAt: string,
  headerImage?: HeaderImage,
  updatedAt: string,
}

export interface MainInfoPageFields {
  content: string,
  headerImage?: any
  order: number,
  title: string,
}

export interface PerformerFields {
  description: string,
  headerImage?: any,
  isStar: boolean,
  name: string,
}

export interface PerformanceFields {
  description?: string,
  headerImage?: any,
  name: string,
  startTime: string,
  endTime: string,
  performers?: any, // Array<Entry<PerformerFields>>,
  location: string,
}

export type MainInfoPageRecord = Omit<MainInfoPageFields, 'headerImage'> & RecordFields
export type PerformerRecord = Omit<PerformerFields, 'headerImage'> & RecordFields
export type PerformanceRecord = Omit<PerformanceFields, 'headerImage'> & RecordFields

export interface DynamicContentResponse {
  mainInfoPages?: MainInfoPageRecord[],
  performers?: PerformerRecord[],
  performances?: PerformanceRecord[],
  synced: string,
}

export interface DynamicContent {
  mainInfoPages: MainInfoPageRecord[],
  performers: PerformerRecord[],
  performances: LocationPerformances,
  synced: string,
}

export type SetDynamicContentAction = AnyAction & DynamicContent

export interface SetSyncAction extends AnyAction {
  synced: string,
}
