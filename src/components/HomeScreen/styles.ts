import { StyleSheet, ViewStyle } from 'react-native'

import commonStyles, { PINK } from '../../styles/common'

const { columnStyle } = commonStyles

const landingScreenButtonStyle: ViewStyle = {
  ...columnStyle,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: PINK,
  elevation: 5,
  margin: 5,
}

export default StyleSheet.create({
  landingScreenButtonStyle,
})
