import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { ReduxStoreState } from '../../store'

interface StateProps {
  lastSynced: Date,
}

type ProfilePageProps = NavigationScreenProps & StateProps

class ProfilePage extends Component<ProfilePageProps, {}> {
  public render() {
    return (
      <View>
        <Text>{process.env.NODE_ENV}</Text>
        <Text>Application name: {DeviceInfo.getApplicationName()}</Text>
        <Text>Device ID: {DeviceInfo.getDeviceId()}</Text>
        <Text>Device unique ID: {DeviceInfo.getUniqueID()}</Text>
        <Text>Last synced: {this.props.lastSynced.toTimeString()}</Text>
      </View>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  lastSynced: new Date(state.dynamicContent.lastSynced),
})

export default connect(mapStateToProps)(ProfilePage)
