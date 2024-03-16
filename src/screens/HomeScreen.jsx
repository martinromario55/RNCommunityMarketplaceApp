import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Header from '../components/HomeScreen/Header'
import Slider from '../components/HomeScreen/Slider'
import Categories from '../components/HomeScreen/Categories'
import LatestItemList from '../components/HomeScreen/LatestItemList'

const HomeScreen = () => {
  const db = getFirestore(app)
  const [sliderList, setSliderList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    getSlider()
    getCategoryList()
    getLatestItemList()
  }, [])

  const getSlider = async () => {
    const querySnapshot = await getDocs(collection(db, 'Sliders'))

    querySnapshot.forEach(doc => {
      // console.log('Results:', doc.data())
      setSliderList(sliderList => [...sliderList, doc.data()])
    })
  }

  const getCategoryList = async () => {
    setCategoryList([])
    const querySnapshot = await getDocs(collection(db, 'Category'))

    querySnapshot.forEach(doc => {
      // console.log('Results:', doc.data())
      setCategoryList(categoryList => [...categoryList, doc.data()])
    })
  }

  const getLatestItemList = async () => {
    setItemList([])
    const querySnapshot = await getDocs(collection(db, 'UserPost'))

    querySnapshot.forEach(doc => {
      // console.log('Results:', doc.data())
      setItemList(itemList => [...itemList, doc.data()])
    })
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white p-3"
    >
      {/* Header and Search bar */}
      <Header />
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* Category List */}
      <Categories categoryList={categoryList} />
      {/* Latest Item List */}
      <LatestItemList itemList={itemList} />
    </ScrollView>
  )
}

export default HomeScreen
