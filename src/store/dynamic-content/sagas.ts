import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchDynamicContent, fetchLastSynced } from '../../services/dynamic-content'
import { loadDynamicContent, saveDynamicContent } from '../../utils/async-storage'
import { DynamicContentResponse } from '../../utils/types/dynamic-content'
import {
  DynamicContentAction,
  SET_DYNAMIC_CONTENT,
  SYNC,
} from './types'

function* syncDynamicContent() {
  const localContent = yield call(loadDynamicContent)
  if (localContent.synced) {
    yield put({
      type: SET_DYNAMIC_CONTENT,
      ...localContent,
    })
  }

  const remoteContentUpdateTime = yield call(fetchLastSynced)

  const remoteSyncNeeded = __DEV__ || !localContent.synced
    || (new Date(localContent.synced) < new Date(remoteContentUpdateTime))

  const dynamicContent: DynamicContentResponse = yield remoteSyncNeeded
    ? call(fetchDynamicContent)
    : localContent

  const action: DynamicContentAction = {
    type: SET_DYNAMIC_CONTENT,
    ...dynamicContent,
  }
  yield put(action)
  yield saveDynamicContent(dynamicContent)
}

export function* watchSync() {
  yield takeLatest(SYNC, syncDynamicContent)
}
