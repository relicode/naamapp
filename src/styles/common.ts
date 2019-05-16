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

const headerTitle = {
  fontFamily: 'roboto',
}

export default StyleSheet.create({
  headerTitle,
  viewStyle,
  columnStyle,
  rowStyle,
  textHeader,
})
