import React, { Component } from 'react'
import { Alert, AppState, AppStateStatus } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Provider } from 'react-redux'

import NetInfo from '@react-native-community/netinfo'

import appConfig from '../app.json'
import MainErrorBoundary from './components/utils/MainErrorBoundary'
import StackContainer from './components/utils/StackContainer'
// import NotifService from './services/NotifService'
import store, { action } from './store'
import { APP_STATE_CHANGE, IS_ONLINE_CHANGE } from './store/app-state/types'

type Props = {} & NavigationScreenProps

interface State {
  senderId: string,
  // notif: NotifService,
  registerToken?: string,
  gcmRegistered?: boolean,
}

export default class App extends Component<Props, State> {

  public constructor(props: Props) {
    super(props)
    this.state = {
      senderId: appConfig.senderID,
      // notif: new NotifService(this.onRegister.bind(this), this.onNotif.bind(this)),
    }
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

  public componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  public onRegister(token: { token: string }) {
    Alert.alert('Registered !', JSON.stringify(token))
    console.log(token)
    this.setState({ registerToken: token.token, gcmRegistered: true })
  }

  /*
  public onNotif(notif: { title: string, message: string }) {
    console.log(notif)
    Alert.alert(notif.title, notif.message)
  }
  */

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
