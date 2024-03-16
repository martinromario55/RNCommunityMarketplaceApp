import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../screens/ProductDetail'
import Myproducts from '../screens/Myproducts'
import ProfileScreen from '../screens/ProfileScreen'
import ExploreScreenStackNav from './ExploreScreenStackNav'

const Stack = createStackNavigator()
const ProfileScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-products"
        component={Myproducts}
        options={{
          headerTitle: 'My Products',
          headerStyle: { backgroundColor: '#3b82f6' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="Explore" component={ExploreScreenStackNav} />
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

export default ProfileScreenStackNav
