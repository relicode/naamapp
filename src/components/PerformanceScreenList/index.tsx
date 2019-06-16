import React, { Component } from 'react'
import { Alert, Button, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import commonStyles from '../../styles/common'
import {
  PERFORMANCE_LOCATIONS,
  PerformanceRecord,
  PerformerRecord,
} from '../../utils/types/dynamic-content'
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

const DAYS_OF_WEEK = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'] as const
const DAYS_OF_WEEKEND = [...[
  DAYS_OF_WEEK[5], // Fri
  DAYS_OF_WEEK[6], // Sat
  DAYS_OF_WEEK[0], // Sun
]] as const

const dayOfWeekMap: { [key: string]: typeof DAYS_OF_WEEKEND[number] } = [0, 5, 6]
  .reduce((acc, cur) => ({ ...acc, [cur]: DAYS_OF_WEEK[cur] }), {})

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
    screen: {
      content: contentWithTime,
      headerImage: performerWithHeaderImage ? performerWithHeaderImage.headerImage : null,
    },
  }
}

const FILTER_KEYS = [
  ...PERFORMANCE_LOCATIONS,
  ...DAYS_OF_WEEKEND,
] as const

type Filters = {
  [key in typeof FILTER_KEYS[number]]: boolean
}

type Props = StateProps & NavigationScreenProps
interface State { filters: Filters }

class PerformanceScreenList extends Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    const dayOfWeek: number = new Date().getDay()

    this.state = {
      filters: {
        ...DAYS_OF_WEEKEND.map((d) => ({
          [d]: DAYS_OF_WEEK.indexOf(d) === dayOfWeek ? true : false,
        })).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
        'Riihi': false,
        'Navetta': false,
        'Sideshow-teltta': false,
      } as Filters,
    }
  }

  public render() {
    const { performances, performers } = this.props

    return (
      <View>
        <ScrollView>
          <ListImageBackground />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {PERFORMANCE_LOCATIONS.map((p) => (
              <View key={p} style={{ flex: 1 }}>
                <Button
                  onPress={() => null}
                  title={p}
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            ))}
          </View>
          <View style={{ marginTop: 25, marginBottom: 25 }} />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {DAYS_OF_WEEKEND.map((p) => (
              <View key={p} style={{ flex: 1 }}>
                <Button
                  onPress={() => null}
                  title={p}
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            ))}
          </View>
          {performances.map((p, idx) => {
            const time = `${formatTime(p.startTime, true)} - ${formatTime(p.endTime)}`
            return (
              <TouchableHighlight
                key={p.name}
                onPress={() => this.props.navigation.navigate(
                  'DynamicContentScreen',
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
                    }} style={performanceRowEndContent}>{'\u2661'}</Text>
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

export default connect(mapStateToProps)(PerformanceScreenList)
