import { AnyAction } from 'redux'
import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchDynamicContent, fetchRemoteUpdateTime } from '../../services/dynamic-content'
import { loadDynamicContent, saveDynamicContent } from '../../utils/async-storage'
import {
  DynamicContent,
  SET_DYNAMIC_CONTENT,
  SYNC,
  TrimmedDynamicContent,
  TrimmedDynamicContentAction,
} from './types'

function* syncDynamicContent() {

  const localContent = yield call(loadDynamicContent)
  if (localContent.lastSynced) {
    const setDynamicContentAction: TrimmedDynamicContentAction = {
      type: SET_DYNAMIC_CONTENT,
      mainInfoPages: localContent.mainInfoPages,
      lastSynced: localContent.lastSynced,
    }
    yield put(setDynamicContentAction)
  }

  const remoteContentUpdateTime = yield call(fetchRemoteUpdateTime)

  const remoteSyncNeeded = !localContent.lastSynced
    || (new Date(localContent.lastSynced) < new Date(remoteContentUpdateTime))

  const dynamicContent: DynamicContent = yield remoteSyncNeeded
    ? call(fetchDynamicContent, 'mainInfoPage')
    : localContent

  const trimmedDynamicContent: TrimmedDynamicContent = {
    mainInfoPages: dynamicContent.mainInfoPages,
    lastSynced: dynamicContent.synced,
  }

  const action: AnyAction = {
    type: SET_DYNAMIC_CONTENT,
    ...trimmedDynamicContent,
  }
  yield put(action)
  yield saveDynamicContent(trimmedDynamicContent)
}

export function* watchSync() {
  yield takeLatest(SYNC, syncDynamicContent)
}
