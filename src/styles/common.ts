import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'

export const BLACK = '#000000'
export const WHITE = '#ffffff'
export const YELLOW = '#eed239'
export const GREEN = '#5cdd8a'
export const PINK = '#feb5ff'
export const MAGENTA = '#f36ebd'

const DEFAULT_FONT_FAMILY = Platform.OS === 'ios' ? 'Times New Roman' : 'serif'
const DEFAULT_FONT_SIZE = 14

const naamatView: ViewStyle = {
  flex: 1,
  backgroundColor: YELLOW,
}

const rowStyle: ViewStyle = {
  ...naamatView,
  flexDirection: 'row',
}

const columnStyle: ViewStyle = {
  ...naamatView,
  flexDirection: 'column',
}

const naamatText: TextStyle = {
  fontSize: DEFAULT_FONT_SIZE,
  fontFamily: DEFAULT_FONT_FAMILY,
  color: BLACK,
}

const textHeaderHuge: TextStyle = {
  ...naamatText,
  fontSize: 36,
}

const textHeader: TextStyle = {
  ...naamatText,
  fontSize: 24,
}

const textHeaderSmall: TextStyle = {
  ...naamatText,
  fontSize: 18,
}

const yellowBackground: ViewStyle = {
  backgroundColor: YELLOW,
}

const greenBackground: ViewStyle = {
  backgroundColor: GREEN,
}

const pinkBackground: ViewStyle = {
  backgroundColor: PINK,
}

const magentaBackground: ViewStyle = {
  backgroundColor: MAGENTA,
}

// Used for cirumventing bug in OnePlus models
const headerTitle = {
  fontFamily: DEFAULT_FONT_FAMILY,
}

export default StyleSheet.create({
  naamatView,
  naamatText,
  headerTitle,
  columnStyle,
  rowStyle,
  textHeaderHuge,
  textHeader,
  textHeaderSmall,
  yellowBackground,
  greenBackground,
  pinkBackground,
  magentaBackground,
})
