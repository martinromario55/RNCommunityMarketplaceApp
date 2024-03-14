import { StatusBar, StyleSheet, Text, View } from 'react-native'
import LoginScreen from './src/screens/LoginScreen'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import TabNavigation from './src/navigations/TabNavigation'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <ClerkProvider publishableKey="">
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  )
}
