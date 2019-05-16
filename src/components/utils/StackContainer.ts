import { createAppContainer, createStackNavigator, NavigationScreenOptions } from 'react-navigation'

import HomePage from '../HomePage'
import MainInfoPageList from '../MainInfoPageList'
import PerformancePageList from '../PerformancePageList'
import PerformerPageList from '../PerformerPageList'
import ProfilePage from '../ProfilePage'
import DynamicContentPage from './DynamicContentPage'

export const MAIN_PAGE_NAMES = [
  'HomePage', 'MainInfoPageList', 'ProfilePage',
  'PerformerPageList', 'PerformancePageList','HomePage',
] as const
export const PAGE_NAMES = [...MAIN_PAGE_NAMES, 'DynamicContentPage'] as const

export type MainPageNames = typeof MAIN_PAGE_NAMES[number]
export type PageNames = typeof PAGE_NAMES[number]

/*
type GetNavigationOptionsParams = (data: {
    navigation: {
      state: {
        params: {
          title: string,
          content: string,
          headerImage: {
            url: string,
            width: number,
            height: number,
          },
        },
      },
    },
  }) => NavigationScreenOptions

const getNavigationOptions: GetNavigationOptionsParams = ({ navigation }) => ({
  title: `Ze Profile'`,
})
*/

/* HeaderTitle issue: (text slicing off)
This happens to me as well on a OnePlus 5T, and I didn't change the font myself.
Adding fontFamily: 'roboto' to headerTitleStyle fixes it.

https://stackoverflow.com/questions/53420564/react-navigation-header-title-cut-off
*/

type StackNavigatorOptions = { [key in PageNames]: {} }

const defaultNavigationOptions = {
  headerTitleStyle: {
    fontFamily: 'roboto',
  },
}

const stackNavigatorOptions: StackNavigatorOptions = {
  HomePage: {
    screen: HomePage,
    navigationOptions: () => ({
      header: null,
    }),
  },
  MainInfoPageList: {
    screen: MainInfoPageList,
    navigationOptions: () => ({ ...defaultNavigationOptions, title: 'Yleisinfo' }),
  },
  PerformerPageList: {
    screen: PerformerPageList,
    navigationOptions: () => ({ ...defaultNavigationOptions, title: 'Esiintyjät' }),
  },
  DynamicContentPage: {
    screen: DynamicContentPage,
    navigationOptions: () => ({ ...defaultNavigationOptions }),
  },
  ProfilePage: {
    screen: ProfilePage,
  },
  PerformancePageList: {
    screen: PerformancePageList,
  },
}

export default createAppContainer(createStackNavigator(stackNavigatorOptions,
  {
    initialRouteName: 'HomePage',
  },
))
