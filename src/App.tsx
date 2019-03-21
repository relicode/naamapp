import React, { Component } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { Provider } from 'react-redux'

import MainErrorBoundary from './components/utils/MainErrorBoundary'
import StackContainer from './components/utils/StackContainer'
import store, { action } from './store'
import { APP_STATE_CHANGE } from './store/app-state/types'

export default class App extends Component<{}> {

  public handleAppStateChange = (appStateStatus: AppStateStatus) => {
    action({ type: APP_STATE_CHANGE, appStateStatus })
  }

  public componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
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
