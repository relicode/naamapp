import React, { Component, Fragment } from 'react'
import { Alert, Button, ScrollView, Text } from 'react-native'
import { NavigationEvents, NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { action, ReduxStoreState } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import { MainInfoPageRecord } from '../../utils/types/dynamic-content'

const { alert } = Alert

interface StateProps {
  mainInfoPages: MainInfoPageRecord[],
}

type HomePageProps = NavigationScreenProps & StateProps

class HomePage extends Component<HomePageProps> {
  public handlePagePress(page: MainInfoPageRecord) {
    alert(page.title, page.content)
  }

  public render() {
    return (
      <ScrollView>
        <NavigationEvents
          onWillFocus={() => action({ type: SYNC })}
        />
        {this.props.mainInfoPages.map((page: MainInfoPageRecord) => (
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
