import { StyleSheet, ViewStyle } from 'react-native'

import commonStyles, { PINK } from '../../styles/common'

const { columnStyle, rowStyle } = commonStyles

const landingScreenButtonStyle: ViewStyle = {
  ...columnStyle,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'black',
  justifyContent: 'center',
  backgroundColor: PINK,
  elevation: 0,
  margin: 5,
}

const landingScreenImageSectionStyle = {
  ...rowStyle,
  flex: 1,
}

const landingScreenButtonSectionStyle = {
  ...rowStyle,
  flex: 2,
}

export default StyleSheet.create({
  landingScreenButtonStyle,
  landingScreenImageSectionStyle,
  landingScreenButtonSectionStyle,
})
