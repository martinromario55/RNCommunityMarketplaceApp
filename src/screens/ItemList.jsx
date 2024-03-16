import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../components/HomeScreen/LatestItemList'
import Loading from '../components/HomeScreen/Loading'

const ItemList = () => {
  const { params } = useRoute()
  const db = getFirestore(app)
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('params:', params.category)
    params && getItemListByCategory()
  }, [params])

  const getItemListByCategory = async () => {
    setLoading(true)
    setItemList([])
    const q = query(
      collection(db, 'UserPost'),
      where('category', '==', params.category)
    )
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
      //   console.log('Results:', doc.data())
      setItemList(itemList => [...itemList, doc.data()])
      setLoading(false)
    })
  }
  return (
    <View className="p-3">
      {loading ? (
        <Loading />
      ) : itemList?.length > 0 ? (
        <LatestItemList itemList={itemList} heading={'Available Items'} />
      ) : (
        <Text className="p-5 text-xl text-gray-400 justify-center text-center mt-24">
          No Posts available
        </Text>
      )}
    </View>
  )
}

export default ItemList
