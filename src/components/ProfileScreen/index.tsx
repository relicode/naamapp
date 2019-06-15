import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'

interface StateProps {
  synced: Date,
}

type ProfileScreenProps = NavigationScreenProps & StateProps

class ProfileScreen extends Component<ProfileScreenProps, {}> {
  public render() {
    return (
      <View>
        <Text>{process.env.NODE_ENV}</Text>
        <Text>Application name: {DeviceInfo.getApplicationName()}</Text>
        <Text>Device ID: {DeviceInfo.getDeviceId()}</Text>
        <Text>Device unique ID: {DeviceInfo.getUniqueID()}</Text>
        <Text>Last synced: {this.props.synced.toTimeString()}</Text>
      </View>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  synced: new Date(state.dynamicContent.synced),
})

export default connect(mapStateToProps)(ProfileScreen)
