import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { loadDynamicContent } from '../../store'

const applicationName = DeviceInfo.getApplicationName()

export default class ProfilePage extends Component<any, any> {
  public constructor(props: any) {
    super(props)
    this.state = {
      dynamicContent: {},
    }
  }
  public async componentDidMount() {
    const dynamicContent = await loadDynamicContent()
    this.setState({ dynamicContent })
  }
  public render() {
    return (
      <View>
        <Text>{process.env.NODE_ENV}</Text>
        <Text>Application name: {applicationName}</Text>
        <Text>Device ID: {DeviceInfo.getDeviceId()}</Text>
        <Text>Device unique ID: {DeviceInfo.getUniqueID()}</Text>
        <Text>Last synced: {this.state.dynamicContent.synced}</Text>
      </View>
    )
  }
}
