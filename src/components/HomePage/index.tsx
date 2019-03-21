import React, { Component, Fragment } from 'react'
import { Button, ScrollView, Text } from 'react-native'
import { Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { action } from '../../store'
import { ReduxStoreState } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import { Page } from '../MainInfoPage/types'

const { alert } = Alert

interface StateProps {
  mainInfoPages: Page[],
}

type HomePageProps = NavigationScreenProps & StateProps

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
        {this.props.mainInfoPages.map((page: Page) => (
          <Fragment key={page.order}>
            <Button
              title={`${page.createdAt.substr(0, 10)} - ${page.title}`}
              onPress={() => this.props.navigation.navigate('MainInfoPage', page)}
            />
            <Text></Text>
          </Fragment>
        ))}
        <Button
          color="red"
          title="Profile page"
          onPress={() => this.props.navigation.navigate('ProfilePage')}
        />
        <Text></Text>
      </ScrollView>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  mainInfoPages: state.dynamicContent.mainInfoPages,
})

export default connect(mapStateToProps)(HomePage)
