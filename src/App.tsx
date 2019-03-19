import React, { Component } from 'react'
/* import { Platform } from 'react-native' */
import { Provider } from 'react-redux'

import Testi from './components/Testi'
import store from './store'

export default class App extends Component<{}> {
  public render() {
    return (
      <Provider store={store}>
        <Testi />
      </Provider>
    )
  }
}
