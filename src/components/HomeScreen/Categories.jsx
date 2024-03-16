import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Categories = ({ categoryList }) => {
  const navigation = useNavigation()
  return (
    <View className="mt-5">
      <Text className="text-xl mb-5">Category</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push('item-list', { category: item.name })
            }
            className="flex-1 border-[1px] border-blue-200 m-1 p-2 rounded-lg bg-blue-50"
          >
            <Image
              source={{ uri: item?.icon }}
              className="h-[70px] w-[70px] rounded-lg object-contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Categories
