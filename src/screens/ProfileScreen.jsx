import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'

const productIcon = 'https://cdn-icons-png.flaticon.com/512/10951/10951869.png'
const exploreIcon = 'https://cdn-icons-png.flaticon.com/512/6613/6613079.png'
const companyIcon = 'https://cdn-icons-png.flaticon.com/512/4300/4300059.png'
const logoutIcon = 'https://cdn-icons-png.flaticon.com/512/992/992511.png'

const ProfileScreen = ({ navigation }) => {
  const { user } = useUser()
  const { isLoaded, signOut } = useAuth()

  const menuList = [
    {
      id: 1,
      title: 'My Products',
      icon: productIcon,
      onPress: () => {
        navigation.push('my-products')
      },
    },
    {
      id: 2,
      title: 'Explore',
      icon: exploreIcon,
      onPress: () => {
        navigation.navigate('Explore')
      },
    },
    {
      id: 3,
      title: 'My Company',
      icon: companyIcon,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Logout',
      icon: logoutIcon,
      onPress: () => {
        signOut()
      },
    },
  ]

  return (
    <View className="p-5">
      <View className="items-center mt-10">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full"
        />
        <View className="items-center mt-3">
          <Text className="font-bold text-2xl">{user?.fullName}</Text>
          <Text className="text-gray-500 text-xl">
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
        <FlatList
          data={menuList}
          numColumns={3}
          style={{ marginTop: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={item.onPress}
              className=" flex-grow p-5 border items-center rounded-lg border-blue-400 m-2 bg-blue-50"
            >
              <Image
                source={{ uri: item.icon }}
                className="w-[50px] h-[50px]"
              />
              <Text className="text-xs font-bold mt-5 text-blue-700">
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export default ProfileScreen
