import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
  const { user } = useUser()
  return (
    <View>
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-slate-500 font-semibold">Welcome</Text>
          <Text className="font-bold text-xl">{user?.fullName}</Text>
        </View>
      </View>

      {/* Search bar */}
      <View className="p-2 px-5 bg-blue-50 rounded-full mt-5 flex-row items-center border-[1px] border-blue-300">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search"
          className="ml-2 text-lg"
          onChangeText={() => {}}
        />
      </View>
    </View>
  )
}

export default Header
