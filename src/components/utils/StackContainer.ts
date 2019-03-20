import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomePage from '../HomePage'
import MainInfoPage from '../MainInfoPage'
import ProfilePage from '../ProfilePage'

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
    },
    ProfilePage: {
      screen: ProfilePage,
    },
  },
  {
    initialRouteName: 'HomePage',
  },
))
