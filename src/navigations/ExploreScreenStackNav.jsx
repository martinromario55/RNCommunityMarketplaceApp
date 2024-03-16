import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../screens/ProductDetail'
import ExploreScreen from '../screens/ExploreScreen'

const Stack = createStackNavigator()
const ExploreScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerTitle: 'Detail',
          headerStyle: { backgroundColor: '#3b82f6' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  )
}

export default ExploreScreenStackNav
