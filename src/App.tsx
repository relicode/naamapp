/* tslint:disable:no-console */

import React, { Component } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import Config from 'react-native-config'
import OneSignal from 'react-native-onesignal'
import { NavigationScreenProps } from 'react-navigation'
import { Provider } from 'react-redux'

import NetInfo from '@react-native-community/netinfo'

import MainErrorBoundary from './components/utils/MainErrorBoundary'
import StackContainer from './components/utils/StackContainer'
import store, { action } from './store'
import {
  APP_STATE_CHANGE,
  DEVICE_INFO_CHANGE,
  DeviceInfo,
  IS_ONLINE_CHANGE,
} from './store/app-state/types'
import { SYNC } from './store/dynamic-content/types'

type Props = {} & NavigationScreenProps

const { ONESIGNAL_APP_ID } = Config

export default class App extends Component<Props> {

  constructor(props: Props) {
    super(props)
    OneSignal.init(ONESIGNAL_APP_ID)

    // OneSignal.inFocusDisplaying(0) // Hide alert
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
    OneSignal.configure() 	// triggers the ids event
    AppState.addEventListener('change', this.handleAppStateChange)
    NetInfo.addEventListener('connectionChange', this.handleNetworkStatusChange)
  }

  public componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
    AppState.removeEventListener('change', this.handleAppStateChange)
    NetInfo.removeEventListener('connectionChange', this.handleNetworkStatusChange)
  }

  public onReceived(notification: string) {
    console.log('Notification received: ', notification)
  }

  public onOpened(openResult: { notification: { payload: { body: string, title: string }, isAppInFocus: boolean } }) {
    // const { body, title } = openResult.notification.payload
    // const { isAppInFocus } = openResult.notification
    // console.log('Message: ', openResult.notification.payload.body)
    // console.log('Data: ', openResult.notification.payload.additionalData)
    // console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
    // if (!isAppInFocus) {
    //   console.log('app not in focus')
    // }
    // alert(title, body)
  }

  public onIds(deviceInfo: DeviceInfo) {
    action({ type: DEVICE_INFO_CHANGE, deviceInfo })
  }

  public handleAppStateChange = (appStateStatus: AppStateStatus) => {
    action({ type: APP_STATE_CHANGE, appStateStatus })
    action({ type: SYNC })
  }

  public async handleNetworkStatusChange() {
    const isOnline = await NetInfo.isConnected.fetch()
    action({ type: IS_ONLINE_CHANGE, isOnline })
    if (isOnline) {
      action({ type: SYNC })
    }
  }

  public render() {
    return (
      <Provider store={store}>
        <MainErrorBoundary>
          <StackContainer />
        </MainErrorBoundary>
      </Provider>
    )
  }
}
