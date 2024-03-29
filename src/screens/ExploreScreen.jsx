import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../components/HomeScreen/LatestItemList'
import Loading from '../components/HomeScreen/Loading'

const ExploreScreen = () => {
  const db = getFirestore(app)
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    setLoading(true)
    setProductList([])
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    snapshot.forEach(doc => {
      // console.log('Results:', doc.data())
      setProductList(productList => [...productList, doc.data()])
      setLoading(false)
    })
  }

  return (
    <ScrollView nestedScrollEnabled={true} className="p-3">
      <Text className="text-2xl font-bold">Explore More</Text>
      {loading ? <Loading /> : <LatestItemList itemList={productList} />}
    </ScrollView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({})
