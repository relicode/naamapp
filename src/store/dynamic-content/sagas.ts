import { call, put, takeLatest } from 'redux-saga/effects'

import {
  loadDynamicContent as getLocalContent,
  saveDynamicContent,
} from '../../services/async-storage'
import { fetchDynamicContent, fetchLastSynced } from '../../services/dynamic-content'
import { DynamicContent, DynamicContentResponse } from '../../utils/types/dynamic-content'
import { DynamicContentAction, SET_DYNAMIC_CONTENT, SYNC } from './types'

function* syncDynamicContent() {
  const localContent: DynamicContent = yield call(getLocalContent)
  if (localContent.synced) {
    yield put({
      type: SET_DYNAMIC_CONTENT,
      ...localContent,
    } as DynamicContentAction)
  }

  const remoteContentUpdateTime = yield call(fetchLastSynced)
  const remoteSyncNeeded = !localContent.synced || (new Date(localContent.synced) < new Date(remoteContentUpdateTime))

  if (remoteSyncNeeded) {
    const dynamicContent: DynamicContentResponse = yield call(fetchDynamicContent)
    yield put({
      type: SET_DYNAMIC_CONTENT,
      ...dynamicContent,
    } as DynamicContentAction)
    yield saveDynamicContent(dynamicContent)
  }
}

export function* watchSync() {
  yield takeLatest(SYNC, syncDynamicContent)
}
