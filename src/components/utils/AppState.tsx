import React, { Component } from 'react'
import { AppState, Text } from 'react-native'

export default class AppStateExample extends Component {
  public state = {
    appState: AppState.currentState,
  }

  public componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  public componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

// tslint:disable-next-line: variable-name
  public _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
    }
    this.setState({ appState: nextAppState })
  }

  public render() {
    return <Text>Current state is: {this.state.appState}</Text>
  }
}
