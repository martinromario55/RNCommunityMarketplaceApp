import { StatusBar, StyleSheet, Text, View } from 'react-native'
import LoginScreen from './src/screens/LoginScreen'

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <LoginScreen />
    </View>
  )
}
