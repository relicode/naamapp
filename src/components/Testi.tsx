import React, { Component, Fragment } from 'react'
import { Button, ScrollView, Text } from 'react-native'
import { Alert } from 'react-native'

import AppState from '../components/utils/AppState'
import { Page } from '../store/pages/types'
import { get } from '../utils/requests'

const { alert } = Alert

interface TestiState {
  pages: Page[],
}

export default class Testi extends Component<{}, TestiState> {
  public constructor(props: any) {
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
        <AppState />
        <Text>{process.env.NODE_ENV}</Text>
        {this.state.pages.map((page) => (
          <Fragment key={page.order}>
            <Button
              title={`${page.createdAt.substr(0, 10)} - ${page.title}`}
              onPress={() => this.handlePagePress(page)}
            />
            <Text></Text>
          </Fragment>
        ))}
      </ScrollView>
    )
  }
}
