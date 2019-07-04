import { StyleSheet, TextStyle } from 'react-native'

import commonStyles, { WHITE } from '../../styles/common'

const { textHeaderHuge } = commonStyles

const listImageBackground: TextStyle = {
  ...textHeaderHuge,
  color: WHITE,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: 5,
}

export default StyleSheet.create({
  listImageBackground,
})
