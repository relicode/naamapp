import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomePage from '../HomePage'
import MainInfoPage from '../MainInfoPage'

export default createAppContainer(createStackNavigator(
  {
    HomePage,
    MainInfoPage,
  },
  {
    initialRouteName: 'HomePage',
  },
))
