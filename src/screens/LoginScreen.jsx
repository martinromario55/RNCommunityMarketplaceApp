import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <View>
      <Image
        source={require('../../assets/images/login.jpg')}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8">
        <Text className="text-[30px] font-bold text-center">Owino Market</Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Buy Sell Marketplace where you can sell old items and make real money
        </Text>
        <TouchableOpacity
          onPress={() => {}}
          className="p-4 bg-blue-500 mt-20 rounded-full"
        >
          <Text className="text-[18px] text-white text-center">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen
