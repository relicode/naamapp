import { put, takeEvery } from 'redux-saga/effects'

import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  NOTIFICATION_ACTION,
  NotificationAction,
  PushNotificationAction,
} from './types'

function* handleNotification(action: NotificationAction) {
  const { addOrDelete, notification } = action

  const type = addOrDelete === 'ADD' ? ADD_NOTIFICATION : DELETE_NOTIFICATION
  yield put({
    type,
    notification,
  } as PushNotificationAction)
}

export function* watchNotifications() {
  yield takeEvery(NOTIFICATION_ACTION, handleNotification)
}
