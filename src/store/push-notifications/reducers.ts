import { Reducer } from 'redux'

import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  generateNotification,
  PushNotificationAction,
  PushNotificationsState,
  SafeNotification,
} from './types'

export const initialState: PushNotificationsState = []

const withoutDuplicates = (state: SafeNotification[], notification: SafeNotification) => (
  state.filter((n) => (
    n.title !== notification.title && n.body !== notification.body
  ))
)

const reducer: Reducer<PushNotificationsState, PushNotificationAction> =
  (state = initialState, action: PushNotificationAction): PushNotificationsState => {
    const { type, notification } = action
    switch (type) {
      case ADD_NOTIFICATION:
        const newNotification = generateNotification(notification.body, notification.title)
        return [...withoutDuplicates(state, newNotification), newNotification]
      case DELETE_NOTIFICATION:
        return withoutDuplicates(state, generateNotification(notification))
      default:
        return state
    }
  }

export default reducer
