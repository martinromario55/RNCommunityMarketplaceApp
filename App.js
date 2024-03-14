import { StatusBar, StyleSheet, Text, View } from 'react-native'
import LoginScreen from './src/screens/LoginScreen'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'

export default function App() {
  return (
    <ClerkProvider publishableKey="">
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <Text>You are Signed In</Text>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  )
}
