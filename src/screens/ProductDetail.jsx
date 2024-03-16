import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Button,
  Share,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '@clerk/clerk-expo'
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'

const ProductDetail = ({ navigation }) => {
  const { params } = useRoute()
  const [product, setProduct] = useState([])
  const { user } = useUser()
  const db = getFirestore(app)
  const nav = useNavigation()

  useEffect(() => {
    // console.log(params)
    params && setProduct(params.product)
    navigation && shareButton()
  }, [params, navigation])

  const sendEmailMessage = () => {
    const subject = 'Regarding ' + product.title
    const body = `Hi ${product.userName}! \n I am interested in this product.`
    Linking.openURL(
      `mailto:${product.userEmail}?subject=${subject}&body=${body}`
    )
  }

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          size={24}
          color={'white'}
          style={{ marginRight: 15 }}
          onPress={() => shareProduct()}
        />
      ),
    })
  }

  const shareProduct = async () => {
    // console.log('Share btn')
    const content = {
      message: `${product.title}\n ${product?.desc}`,
    }
    Share.share(content).then(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    )
  }

  const deletePost = () => {
    Alert.alert('Alert', 'Are you sure you want to delete this post?', [
      {
        text: 'Yes',
        onPress: () => deleteFromFireStore(),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ])
  }

  const deleteFromFireStore = async () => {
    // console.log('Post Deleted')
    const q = query(
      collection(db, 'UserPost'),
      where('title', '==', product.title)
    )
    const snapshot = await getDocs(q)

    snapshot.forEach(doc => {
      deleteDoc(doc.ref).then(resp => {
        console.log('Post Deleted')
        nav.goBack()
      })
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
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
      {user?.primaryEmailAddress?.emailAddress == product.userEmail ? (
        <TouchableOpacity
          onPress={() => deletePost()}
          className="p-3 bg-red-500 m-3 rounded-full"
        >
          <Text className="text-xl font-bold text-center text-white">
            Delete Post
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="p-3 bg-blue-500 m-3 rounded-full"
        >
          <Text className="text-xl font-bold text-center text-white">
            Send Message
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

export default ProductDetail
