import React from 'react'
import { Text, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const applicationName = DeviceInfo.getApplicationName()

const ProfilePage = () => (
  <View>
    <Text>{process.env.NODE_ENV}</Text>
    <Text>Application name: {applicationName}</Text>
    <Text>Device ID: {DeviceInfo.getDeviceId()}</Text>
    <Text>Device unique ID: {DeviceInfo.getUniqueID()}</Text>
  </View>
)

export default ProfilePage
