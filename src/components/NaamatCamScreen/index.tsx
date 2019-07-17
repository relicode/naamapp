import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import commonStyles, { GREEN, PINK } from '../../styles/common'
import { toHelsinkiMoment } from '../../utils'
import { get } from '../../utils/requests'

const { naamatView, naamatText, textHeaderSmall } = commonStyles

interface State {
  notifications: any[],
}

export default class Notifications extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { notifications: [] }
  }
  public async componentDidMount() {
    const notifications = await get('/notifications') as any
    this.setState({ notifications })
  }
  public render() {
    return (
      <ScrollView style={naamatView}>
        {this.state.notifications ? (
          this.state.notifications.map((n, idx) => (
            <View style={{ padding: 10, backgroundColor: idx % 2 === 0 ? PINK : GREEN }} key={n.queuedAt}>
              <Text style={textHeaderSmall}>
                {n.headings}
              </Text>
              <Text style={naamatText}>{toHelsinkiMoment((new Date(n.queuedAt * 1000).toISOString())).strShort}</Text>
              <Text style={naamatText}>{'\n'}{n.contents}</Text>
            </View>
         ))
        ) : null}
      </ScrollView>
    )
  }
}
