import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import commonStyles from '../../styles/common'

const { textHeader, textHeaderSmall } = commonStyles

const performanceRow: ViewStyle = {
  flexDirection: 'row',
  padding: 15,
}

const performanceRowStart: ViewStyle = {
  flex: 12,
}

const performanceRowStartTimeAndPlace: TextStyle = {
  ...textHeaderSmall,
}

const performanceRowStartPlace: TextStyle = {
  fontWeight: 'bold',
}

const performanceRowStartTime: TextStyle = {
  fontWeight: 'normal',
}

const performanceRowStartPerformer: TextStyle = {
  ...textHeader,
}

const performanceRowEnd: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
}

const performanceRowEndContent: TextStyle = {
  ...textHeader,
}

export default StyleSheet.create({
  performanceRow,
  performanceRowStart,
  performanceRowEnd,
  performanceRowEndContent,
  performanceRowStartTimeAndPlace,
  performanceRowStartPlace,
  performanceRowStartTime,
  performanceRowStartPerformer,
})
