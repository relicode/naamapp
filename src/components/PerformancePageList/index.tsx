import React, { Component, Fragment } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import commonStyles from '../../styles/common'
import { PerformanceLocationName, PerformanceRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'
import styles from './styles'

const { greenBackground, pinkBackground } = commonStyles

const {
  performanceRow,
  performanceRowStart,
  performanceRowEnd,
  performanceRowEndContent,
  performanceRowStartTimeAndPlace,
  performanceRowStartPlace,
  performanceRowStartTime,
  performanceRowStartPerformer,
} = styles

interface StateProps {
  performances: PerformanceRecord[],
}

const dayOfWeekMap = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La']

const formatTime = (date: string, dayOfWeek: boolean = false): string => {
  const newDate = new Date(date)
  return (
    (dayOfWeek ? `${dayOfWeekMap[newDate.getDay()]} ` : '') +
    [newDate.getHours(), newDate.getMinutes()].map((d) => String(d).padStart(2, '0')).join(':')
  )
}

/*

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate(
                'DynamicContentPage',
                { page: { headerImage, content: item.description }, title: name },
              )}
            >
              <ListImageBackground {...listImageProps} />
            </TouchableHighlight>

*/

class PerformancePageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    const { performances } = this.props

    return (
      <View>
        <ScrollView>
          <ListImageBackground />
          {performances.map((p, idx) => (
            <TouchableHighlight
              key={p.name}
              onPress={() => this.props.navigation.navigate(
                'DynamicContentPage',
                { page: { headerImage: p.headerImage, content: p.description }, title: p.name },
              )}
            >
              <View style={[performanceRow, idx % 2 === 1 ? greenBackground : pinkBackground]}>
                <View style={performanceRowStart}>
                  <Text style={performanceRowStartTimeAndPlace}>
                    <Text style={performanceRowStartPlace}>{p.location} </Text>
                    <Text style={performanceRowStartTime}>
                      {formatTime(p.startTime, true)} - {formatTime(p.endTime)}
                    </Text>
                  </Text>
                  <Text style={performanceRowStartPerformer}>{p.name}</Text>
                </View>

                <View style={performanceRowEnd}>
                  <Text onPress={(ev) => {
                    ev.preventDefault()
                    Alert.alert(`${p.name} liked`)
                  }} style={performanceRowEndContent}>{ '\u2661' }</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  performances: state.dynamicContent.performances,
})

export default connect(mapStateToProps)(PerformancePageList)
