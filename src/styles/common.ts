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

const textHeaderSmall: TextStyle = {
  fontSize: 18,
}

const yellowBackground: ViewStyle = {
  backgroundColor: '#eed239',
}

const greenBackground: ViewStyle = {
  backgroundColor: '#5cdd8a',
}

const pinkBackground: ViewStyle = {
  backgroundColor: '#feb5ff',
}

const magentaBackground: ViewStyle = {
  backgroundColor: '#f36ebd',
}

// Used for cirumventing bug in OnePlus models
const headerTitle = {
  fontFamily: 'roboto',
}

export default StyleSheet.create({
  headerTitle,
  viewStyle,
  columnStyle,
  rowStyle,
  textHeader,
  textHeaderSmall,
  yellowBackground,
  greenBackground,
  pinkBackground,
  magentaBackground,
})
