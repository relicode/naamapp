export interface Page {
  [x: string]: string | number | undefined
  content: string,
  createdAt: string,
  headerImage: string,
  title: string,
  updatedAt: string,
  order: number,
}

export interface PagesState {
  mainPages: Page[],
  synced: string,     // 2019-03-16T20:14:23.230Z
}

const storePrefix: string = 'pages'
export const SYNC: string = `${storePrefix}/SYNC`
export const SET_MAIN_PAGES: string = `${storePrefix}/SET_MAIN_PAGES`
