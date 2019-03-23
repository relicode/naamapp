import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loadDynamicContent, saveDynamicContent } from '../../store'
import { get } from '../../utils/requests'
import { DynamicContent, SET_MAIN_INFO_PAGES, SYNC } from './types'

function* syncDynamicContent() {
  const [localContent, remoteCache] = yield all([
    call(loadDynamicContent),
    call(get, '/cache'),
  ])
  const storageSynced = localContent.synced
  const lastRemoteUpdate = remoteCache.time
  const remoteSyncNeeded = !storageSynced || (new Date(storageSynced) < new Date(lastRemoteUpdate))

  const dynamicContent: DynamicContent = yield remoteSyncNeeded ? call(get, '/main-pages') : call(loadDynamicContent)
  const { mainInfoPages, synced } = dynamicContent

  if (remoteSyncNeeded) {
    yield call(saveDynamicContent, dynamicContent)
  }

  yield put({
    type: SET_MAIN_INFO_PAGES,
    mainInfoPages,
    synced,
  })
}

export function* watchSync() {
  yield takeLatest(SYNC, syncDynamicContent)
}
