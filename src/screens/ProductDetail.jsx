import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

const ProductDetail = () => {
  const { params } = useRoute()
  const [product, setProduct] = useState([])

  useEffect(() => {
    // console.log(params)
    params && setProduct(params.product)
  }, [params])

  const sendEmailMessage = () => {
    const subject = 'Regarding ' + product.title
    const body = `Hi ${product.userName}! \n I am interested in this product.`
    Linking.openURL(
      `mailto:${product.userEmail}?subject=${subject}&body=${body}`
    )
  }

  return (
    <ScrollView className="bg-white">
      <Image
        source={{ uri: product?.image }}
        className="h-[320px] w-full object-contain"
      />
      <View className="p-3">
        <Text className="text-xl font-bold">{product?.title}</Text>
        <Text className="text-blue-500 bg-blue-200 p-1 rounded-full px-3 text-[12px] w-[100px] text-center mt-1">
          {product?.category}
        </Text>
        <Text className="mt-3 font-semibold text-lg">Description</Text>
        <Text className="text-lg text-gray-500">{product?.desc}</Text>
        <Text className="text-xl font-bold text-blue-500">
          ${product?.price}
        </Text>
      </View>
      <View className="p-3 flex-row items-center gap-3 bg-blue-300 mt-3">
        <Image
          source={{ uri: product?.userImage }}
          className="w-12 h-12 rounded-full"
        />
        <View className="">
          <Text className="font-bold text-xl">{product?.userName}</Text>
          <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => sendEmailMessage()}
        className="p-3 bg-blue-500 m-3 rounded-full"
      >
        <Text className="text-xl font-bold text-center text-white">
          Send Message
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ProductDetail
