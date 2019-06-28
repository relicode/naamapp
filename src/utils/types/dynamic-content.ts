import { AnyAction } from 'redux'

export const PERFORMANCE_LOCATIONS = ['Riihi', 'Navetta', 'Sideshow-teltta'] as const
export type PerformanceLocationName = typeof PERFORMANCE_LOCATIONS[number]
export type LocationPerformances = {
  [x in PerformanceLocationName]?: PerformanceRecord[]
}

export const DYNAMIC_CONTENT_TYPES = ['mainInfoScreen', 'performer', 'performance'] as const
export type DynamicContentTypes = typeof DYNAMIC_CONTENT_TYPES[number]

export type DynamicContentFieldTypes = MainInfoScreenFields | PerformerFields | PerformanceFields
export type DynamicContentRecord = MainInfoScreenRecord | PerformerRecord | PerformanceRecord

export interface HeaderImage {
  height: number,
  url: string,
  width: number,
}

export interface RecordFields {
  createdAt: string,
  headerImage?: HeaderImage,
  updatedAt: string,
  id: string,
}

export interface MainInfoScreenFields {
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

export type MainInfoScreenRecord = Omit<MainInfoScreenFields, 'headerImage'> & RecordFields
export type PerformerRecord = Omit<PerformerFields, 'headerImage'> & RecordFields
export type PerformanceRecord = Omit<PerformanceFields, 'headerImage'> & RecordFields

export interface DynamicContentResponse {
  mainInfoScreens?: MainInfoScreenRecord[],
  performers?: PerformerRecord[],
  performances?: PerformanceRecord[],
  synced: string,
}

export interface DynamicContent {
  mainInfoScreens: MainInfoScreenRecord[],
  performers: PerformerRecord[],
  performances: PerformanceRecord[],
  synced: string,
}

export type SetDynamicContentAction = AnyAction & DynamicContent

export interface SetSyncAction extends AnyAction {
  synced: string,
}
