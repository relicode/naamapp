import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const viewStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
}

const rowStyle: ViewStyle = {
  ...viewStyle,
  flexDirection: 'row',
}

const columnStyle: ViewStyle = {
  ...viewStyle,
}

const textHeader: TextStyle = {
  fontSize: 24,
}

export default StyleSheet.create({
  viewStyle,
  columnStyle,
  rowStyle,
  textHeader,
})
