import { createAppContainer, createStackNavigator } from 'react-navigation'

import MainInfoPage from '../MainInfoPage'
import Testi from '../Testi'

export default createAppContainer(createStackNavigator(
  {
    Testi,
    MainInfoPage,
  },
  {
    initialRouteName: 'Testi',
  },
))
