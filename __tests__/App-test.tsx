/**
 * @format
 */

import 'react-native'

import React from 'react'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import App from '../src/App'

jest.mock('react-native-device-info', () => {
  return {
    getApplicationName: jest.fn(),
  }
})

jest.mock('@react-native-community/async-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  }
})

jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest.fn().mockReturnValue(function NavigationContainer() {return null}),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest.fn().mockImplementation(x => ({...x,  'type': 'Navigation/PUSH'})),
      replace: jest.fn().mockImplementation(x => ({...x,  'type': 'Navigation/REPLACE'})),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation(x => x),
    }
  }
})

it('renders correctly', () => {
  renderer.create(<App />)
})
