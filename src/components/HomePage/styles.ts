import { StyleSheet, ViewStyle } from 'react-native'

import commonStyles from '../../styles/common'

const { columnStyle } = commonStyles

const landingPageButtonStyle: ViewStyle = {
  ...columnStyle,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'gray',
  elevation: 5,
  margin: 5,
}

export default StyleSheet.create({
  landingPageButtonStyle,
})
