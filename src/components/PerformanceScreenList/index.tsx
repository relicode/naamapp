import React, { Component } from 'react'
import { Alert, Button, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import commonStyles, { GREEN, PINK } from '../../styles/common'
import { PerformanceRecord, PerformerRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'
import styles from './styles'

const { naamatView, greenBackground, pinkBackground } = commonStyles

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
  DAYS_OF_WEEK[5], // 'Fri'
  DAYS_OF_WEEK[6], // 'Sat'
  DAYS_OF_WEEK[0], // 'Sun'
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
    ? new Array().concat(allPerformers.map((p) => p.description))
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

type Props = StateProps & NavigationScreenProps
interface State { dayFilter: typeof DAYS_OF_WEEK[number] | false }

class PerformanceScreenList extends Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    const dayOfWeek: number = new Date().getDay()

    this.state = {
      dayFilter: dayOfWeekMap[dayOfWeek],
    }
  }

  public render() {
    const { performances, performers } = this.props
    return (
      <View style={naamatView}>
        <ScrollView>
          <ListImageBackground
            title="Aikataulut"
            headerImage={require('../../assets/images/background-images/schedule.png')}
          />
          <View style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
            {DAYS_OF_WEEKEND.map((p) => (
              <View key={p} style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                <Button
                  onPress={() => this.setState((prevState) => (
                    prevState.dayFilter === p ? { dayFilter: false } : { dayFilter: p }
                  ))}
                  title={p}
                  color={this.state.dayFilter === p ? GREEN : PINK}
                />
              </View>
            ))}
          </View>
          {performances
            .filter((p) => (
              this.state.dayFilter ? dayOfWeekMap[new Date(p.startTime).getDay()] === this.state.dayFilter : true
            ))
            .map((p, idx) => {
              const time = `${formatTime(p.startTime, true)} - ${formatTime(p.endTime)}`
              return (
                <TouchableHighlight
                  key={p.id}
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
                        Alert.alert('\u2661\u2661\u2661\u2661\u2661', 'Mekin tykätään tästä <3')
                      }} style={performanceRowEndContent}>{'\u2661'}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )
            },
          )}
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
