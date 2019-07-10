import React from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'

import { PINK } from '../../styles/common'

interface Props {
  visible: boolean,
  content: string,
}

export default (props: Props) => (
  <Modal transparent={true}
      visible={props.visible}
    >
    <View style={{
      backgroundColor: '#00000080',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}}
    >
      <View style={{
        backgroundColor: '#fff', padding: 20,
        width: 300,
        height: 300}}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color={PINK} />
          <Text style={{ fontSize: 24 }}>
            {props.content}
          </Text>
        </View>
      </View>
    </View>
  </Modal>
)
