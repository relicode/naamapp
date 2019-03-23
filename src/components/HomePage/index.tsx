import React, { Component, Fragment } from 'react'
import { Button, ScrollView, Text } from 'react-native'
import { Alert } from 'react-native'
import { NavigationEvents, NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { action } from '../../store'
import { ReduxStoreState } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import { MainInfoPage } from '../../store/dynamic-content/types'

const { alert } = Alert

interface StateProps {
  mainInfoPages: MainInfoPage[],
}

type HomePageProps = NavigationScreenProps & StateProps

const syncDynamicContent = () => (
  action({ type: SYNC })
)

class HomePage extends Component<HomePageProps> {
  public handlePagePress(page: MainInfoPage) {
    alert(page.title, page.content)
  }

  public render() {
    return (
      <ScrollView>
        <NavigationEvents
          onWillFocus={syncDynamicContent}
        />
        {this.props.mainInfoPages.map((page: MainInfoPage) => (
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
