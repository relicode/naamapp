import { AnyAction } from 'redux'

export interface Notification {
  title?: string,
  body: string,
}

export interface SafeNotification extends Notification {
  title: string,
}

export type PushNotificationsState = SafeNotification[]

export interface PushNotificationAction extends AnyAction {
  notification: Notification,
}

export interface NotificationAction extends AnyAction {
  notification: Notification,
  addOrDelete: 'ADD' | 'DELETE',
}

const storePrefix = 'pushNotifications'
export const ADD_NOTIFICATION = `${storePrefix}/ADD_NOTIFICATION`
export const DELETE_NOTIFICATION = `${storePrefix}/DELETE_NOTIFICATION`
export const NOTIFICATION_ACTION = `${storePrefix}/NOTIFICATION_ACTION`

export const generateNotification = (b?: any, t?: any): SafeNotification => {
  const body = (typeof b === 'string' && b.length) ? b : ':)'
  const title = (typeof t === 'string' && t.length) ? t : 'Huom!'
  return { title, body }
}
