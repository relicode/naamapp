import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

import commonStyles from '../../styles/common'

const { naamatView, textHeader } = commonStyles
const styles = StyleSheet.create({
  view: {
    ...naamatView,
    flex: 1,
    padding: 5,
  },
  text: {
    ...textHeader,
    textAlign: 'center',
  },
})

interface Props {
  label: string,
  onPress: (ev: any) => any,
  color: string,
}

const ButtonWrapper = ({ onPress, label, color }: Props) => {
    // Normal Android buttons get a gray ripple
    return (
      <TouchableNativeFeedback
        onPress={onPress}
      >
        <View style={{ ...styles.view, backgroundColor: color }}>
          <Text style={{ ...styles.text }}>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

export default ButtonWrapper
