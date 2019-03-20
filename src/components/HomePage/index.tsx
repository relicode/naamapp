import React, { Component, Fragment } from 'react'
import { Button, ScrollView, Text } from 'react-native'
import { Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { action } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import { ApplicationState } from '../../store/types'
import { Page } from '../MainInfoPage/types'
import AppStateIndicator from '../utils/AppStateIndicator'

const { alert } = Alert

interface StateProps {
  mainInfoPages: Page[],
}

interface HomePageProps extends NavigationScreenProps, StateProps {}

class HomePage extends Component<HomePageProps> {
  public handlePagePress(page: Page) {
    alert(page.title, page.content)
  }

  public componentDidMount() {
    action({ type: SYNC })
  }

  public render() {
    return (
      <ScrollView>
        <AppStateIndicator />
        <Text>{process.env.NODE_ENV}</Text>
        {this.props.mainInfoPages.map((page: Page) => (
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

const mapStateToProps: MapStateToProps<StateProps, {}, ApplicationState> = (state) => ({
  mainInfoPages: state.dynamicContent.mainInfoPages,
})

export default connect(mapStateToProps)(HomePage)
