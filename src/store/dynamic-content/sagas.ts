import { call, put, takeLatest } from 'redux-saga/effects'

import { get } from '../../utils/requests'
import { MainInfoPage, SET_MAIN_INFO_PAGES, SYNC } from './types'

function* syncDynamicContent() {
  const mainInfoPages: MainInfoPage[] = yield call(get, '/main-pages')

  yield put({
    type: SET_MAIN_INFO_PAGES,
    mainInfoPages,
    synced: new Date().toISOString(),
  })
}

export function* watchSync() {
  yield takeLatest(SYNC, syncDynamicContent)
}
