import React, { Component } from 'react'
/* import { Platform } from 'react-native' */
import { Provider } from 'react-redux'

import MainErrorBoundary from './components/utils/MainErrorBoundary'
import StackContainer from './components/utils/StackContainer'
import store from './store'

export default class App extends Component<{}> {
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
