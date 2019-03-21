import { put, takeEvery } from 'redux-saga/effects'

import { APP_STATE_CHANGE, SET_APP_STATE_STATUS, SetAppStateStatusAction } from './types'

function* setAppStateStatus(action: SetAppStateStatusAction) {
  const { appStateStatus } = action
  yield put({
    type: SET_APP_STATE_STATUS,
    status: appStateStatus,
  })
}

export function* watchAppStateChange() {
  yield takeEvery(APP_STATE_CHANGE, setAppStateStatus)
}
