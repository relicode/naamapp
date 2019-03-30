import { NavigationScreenOptions, createAppContainer, createStackNavigator } from 'react-navigation'

import HomePage from '../HomePage'
import MainInfoPage from '../MainInfoPage'
import ProfilePage from '../ProfilePage'

interface NavigationOptions {
  (data: {
    navigation: {
      state: {
        params: {
          title: string,
          content: string,
          headerImage: {
            url: string,
            width: number,
            height: number,
          }
        }
      }
    }
  }): NavigationScreenOptions
}

const navigationOptions: NavigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.name}'s Profile'`,
})

export default createAppContainer(createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: () => ({
        header: null,
      }),
    },
    MainInfoPage: {
      screen: MainInfoPage,
      navigationOptions,
    },
    ProfilePage: {
      screen: ProfilePage,
    },
  },
  {
    initialRouteName: 'HomePage',
  },
))
