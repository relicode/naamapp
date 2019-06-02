import React, { Component, Fragment } from 'react'
import { Dimensions, Image, Platform, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import store, { ReduxStoreState } from '../../store'
import styles from '../../styles/common'
import {
  LocationPerformances,
  PERFORMANCE_LOCATIONS,
  PerformanceLocationName,
  PerformanceRecord,
} from '../../utils/types/dynamic-content'

const { rowStyle, columnStyle } = styles

interface StateProps {
  performances: LocationPerformances,
}

const formatTime = (date: string): string => {
  const newDate = new Date(date)
  return [newDate.getHours(), newDate.getMinutes()].map((d) => String(d).padStart(2, '0')).join(':')
}

class PerformancePageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    const { performances } = this.props

    const r = performances.Riihi || []
    const n = performances.Navetta || []
    const s = performances['Sideshow-teltta'] || []

    const rr = r.concat(r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r)
    const nn = r.concat(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)
    const ss = r.concat(s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s)

    return (
      <View style={rowStyle}>
        <ScrollView style={columnStyle}>
          <Text style={{ fontSize: 24 }}>Riihi</Text>
          {rr.map((p) => (
            <View style={{ borderWidth: 2, borderColor: 'black' }} key={Math.random()}>
              <Text>{p.name}</Text>
              <Text>{formatTime(p.startTime)}-{formatTime(p.endTime)}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView style={columnStyle}>
          <Text style={{ fontSize: 24 }}>Navetta</Text>
          {nn.map((p) => (
            <View style={{ borderWidth: 2, borderColor: 'black' }} key={Math.random()}>
              <Text>{p.name}</Text>
              <Text>{formatTime(p.startTime)}-{formatTime(p.endTime)}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView style={columnStyle}>
          <Text style={{ fontSize: 24 }}>Sideshow-teltta</Text>
          {ss.map((p) => (
            <View style={{ borderWidth: 2, borderColor: 'black' }} key={Math.random()}>
              <Text>{p.name}</Text>
              <Text>{formatTime(p.startTime)}-{formatTime(p.endTime)}</Text>
            </View>
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
