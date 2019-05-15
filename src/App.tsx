import React, { Component } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { Provider } from 'react-redux'

import NetInfo from '@react-native-community/netinfo'

import MainErrorBoundary from './components/utils/MainErrorBoundary'
import StackContainer from './components/utils/StackContainer'
import store, { action } from './store'
import { APP_STATE_CHANGE, IS_ONLINE_CHANGE } from './store/app-state/types'

export default class App extends Component<{}> {

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

  public componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
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
