/* tslint:disable:no-console */

import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal'
import { Alert, AppState, AppStateStatus } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Provider } from 'react-redux'
import Config from 'react-native-config'

import NetInfo from '@react-native-community/netinfo'

import appConfig from '../app.json'
import MainErrorBoundary from './components/utils/MainErrorBoundary'
import StackContainer from './components/utils/StackContainer'
import store, { action } from './store'
import { APP_STATE_CHANGE, IS_ONLINE_CHANGE } from './store/app-state/types'

type Props = {} & NavigationScreenProps

const { ONESIGNAL_APP_ID } = Config

export default class App extends Component<Props> {

  constructor(props: Props) {
    super(props)
    OneSignal.init(ONESIGNAL_APP_ID)
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
    OneSignal.configure() 	// triggers the ids event
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

  public onOpened(openResult: any) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  public onIds(device: string) {
    console.log('Device info: ', device)
  }

  public handleAppStateChange = (appStateStatus: AppStateStatus) => {
    action({ type: APP_STATE_CHANGE, appStateStatus })
  }

  public async handleNetworkStatusChange() {
    const isOnline = await NetInfo.isConnected.fetch()
    action({ type: IS_ONLINE_CHANGE, isOnline })
  }

  public componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    NetInfo.addEventListener('connectionChange', this.handleNetworkStatusChange)
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
