import React, { Component } from 'react'
/* import { Platform } from 'react-native' */
import { Provider } from 'react-redux'

import MainErrorBoundary from './components/utils/MainErrorBoundary'
import StackContainer from './components/utils/StackContainer'
import store from './store'
import { get } from './utils/requests'

export default class App extends Component<{}> {
  public sync = async () => {
    const pages = await get('/main-pages') as Page[]
    this.setState({ pages })
  }

  public async componentDidMount() {
    this.sync()
    setInterval(this.sync, 1000 * 60)
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
