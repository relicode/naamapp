import { StyleSheet, ViewStyle } from 'react-native'

import commonStyles from '../../styles/common'

const { rowStyle } = commonStyles

const mainInfoScreenRow: ViewStyle = {
  ...rowStyle,
  flexDirection: 'row',
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: 'gray',
}

const mainInfoScreenRowStart: ViewStyle = {
  flex: 12,
}

const mainInfoScreenRowEnd: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
}

export default StyleSheet.create({
  mainInfoScreenRow,
  mainInfoScreenRowStart,
  mainInfoScreenRowEnd,
})
