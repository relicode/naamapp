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
import { PerformanceRecord, PerformerRecord } from '../../utils/types/dynamic-content'
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
  performers: PerformerRecord[],
}

const dayOfWeekMap = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La']

const formatTime = (date: string, dayOfWeek: boolean = false): string => {
  const newDate = new Date(date)
  return (
    (dayOfWeek ? `${dayOfWeekMap[newDate.getDay()]} ` : '') +
    [newDate.getHours(), newDate.getMinutes()].map((d) => String(d).padStart(2, '0')).join(':')
  )
}

const generateDynamicContent = (performance: PerformanceRecord, allPerformers: PerformerRecord[], time: string) => {
  const title = performance.name
  const content = performance.description
    ? [performance.description].concat(allPerformers.map((p) => p.description))
    : allPerformers.map((p) => p.description)

  const performerWithHeaderImage = allPerformers.find((p) => p.headerImage !== undefined)
  const contentWithTime = [`## ${time} - ${performance.location}`, ...content]

  return {
    title,
    page: {
      content: contentWithTime,
      headerImage: performerWithHeaderImage ? performerWithHeaderImage.headerImage : null,
    },
  }
}

class PerformancePageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    const { performances, performers } = this.props

    return (
      <View>
        <ScrollView>
          <ListImageBackground />
          {performances.map((p, idx) => {
            const time = `${formatTime(p.startTime, true)} - ${formatTime(p.endTime)}`
            return (
              <TouchableHighlight
                key={p.name}
                onPress={() => this.props.navigation.navigate(
                  'DynamicContentPage',
                  generateDynamicContent(
                    p,
                    performers
                      ? performers.filter((performer) => p.performers.split(', ').includes(performer.name))
                      : [],
                    time,
                  ),
                )}
              >
                <View style={[performanceRow, idx % 2 === 1 ? greenBackground : pinkBackground]}>
                  <View style={performanceRowStart}>
                    <Text style={performanceRowStartTimeAndPlace}>
                      <Text style={performanceRowStartPlace}>{p.location} </Text>
                      <Text style={performanceRowStartTime}>{time}</Text>
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
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  performances: state.dynamicContent.performances,
  performers: state.dynamicContent.performers,
})

export default connect(mapStateToProps)(PerformancePageList)
