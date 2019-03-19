import React, { Component, Fragment } from 'react'
import { Button, ScrollView, Text, ViewStyle } from 'react-native'
import { Alert } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'

import { Page } from '../store/pages/types'
import { get } from '../utils/requests'
import AppStateIndicator from './utils/AppStateIndicator'

const { alert } = Alert

interface TestiProps {
  navigation: NavigationScreenProp<any, any>
}

interface TestiState {
  pages: Page[],
}

export default class Testi extends Component<TestiProps, TestiState> {
  public constructor(props: TestiProps) {
    super(props)
    this.state = {
      pages: [],
    }
  }

  public sync = () => {
    setInterval(async () => {
      const pages = await get('/main-pages') as Page[]
      this.setState({ pages })
    }, 1000)
  }

  public async componentDidMount() {
    this.sync()
  }

  public handlePagePress(page: Page) {
    alert(page.title, page.content)
  }

  public render() {
    return (
      <ScrollView>
        <AppStateIndicator />
        <Text>{process.env.NODE_ENV}</Text>
        {this.state.pages.map((page) => (
          <Fragment key={page.order}>
            <Button
              title={`${page.createdAt.substr(0, 10)} - ${page.title}`}
              onPress={() => this.props.navigation.navigate('MainInfoPage', page)}
            />
            <Text></Text>
          </Fragment>
        ))}
      </ScrollView>
    )
  }
}
