import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PostItem = ({ item }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.push('product-detail', { product: item })}
      className="flex-1 m-2 p-2 rounded-lg border border-blue-300"
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[140px] rounded-lg"
      />
      <View>
        <Text className="text-lg font-semibold mt-2">{item.title}</Text>
        <Text className="text-lg font-semibold text-blue-500">
          ${item.price}
        </Text>
        <Text className="text-blue-500 bg-blue-200 p-1 rounded-full px-3 text-[12px] w-[100px] text-center mt-1">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default PostItem
