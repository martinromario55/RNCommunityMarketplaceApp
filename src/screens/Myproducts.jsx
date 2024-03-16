import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItemList from '../components/HomeScreen/LatestItemList'
import Loading from '../components/HomeScreen/Loading'
import { useNavigation } from '@react-navigation/native'

const Myproducts = () => {
  const db = getFirestore(app)
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const navigation = useNavigation()

  useEffect(() => {
    user && getUserPosts()
  }, [user])

  useEffect(() => {
    navigation.addListener('focus', e => {
      console.log(e)
      getUserPosts()
    })
  }, [navigation])

  const getUserPosts = async () => {
    setLoading(true)
    setProductList([])
    const q = query(
      collection(db, 'UserPost'),
      where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
    )
    const snapshot = await getDocs(q)

    snapshot.forEach(doc => {
      //   console.log('Results:', doc.data())
      setProductList(productList => [...productList, doc.data()])
      setLoading(false)
    })
  }
  return (
    <ScrollView nestedScrollEnabled={true} className="p-3">
      {loading ? <Loading /> : <LatestItemList itemList={productList} />}
    </ScrollView>
  )
}

export default Myproducts
