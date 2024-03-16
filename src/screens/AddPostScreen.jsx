import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker'
import { useUser } from '@clerk/clerk-expo'

const AddPostScreen = () => {
  const db = getFirestore(app)
  const [categoryList, setCategoryList] = useState([])
  const [image, setImage] = useState(null)
  const storage = getStorage()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  // Image Picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    // console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const getCategoryList = async () => {
    setCategoryList([])
    const querySnapshot = await getDocs(collection(db, 'Category'))

    querySnapshot.forEach(doc => {
      // console.log('Results:', doc.data())
      setCategoryList(categoryList => [...categoryList, doc.data()])
    })
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  const onSubmitMethod = async value => {
    setLoading(true)
    // value.image = image
    // console.log('Image', value.image)

    // convert Uri to Blob File
    const resp = await fetch(image)
    const blob = await resp.blob()
    const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg')

    uploadBytes(storageRef, blob)
      .then(snapshot => {
        // console.log('Uploaded a blob or file!')
      })
      .then(resp => {
        getDownloadURL(storageRef).then(async downloadUrl => {
          // console.log(downloadUrl)
          value.image = downloadUrl
          value.userName = user.fullName
          value.userEmail = user.primaryEmailAddress.emailAddress
          value.userImage = user.imageUrl
          value.createdAt = Date.now()

          const docRef = await addDoc(collection(db, 'UserPost'), value)

          if (docRef.id) {
            setLoading(false)
            // console.log('Document Added!')
            Alert.alert('Success', 'Post Added Successfully!')

            // reset value to empty
            value.title = ''
            value.desc = ''
            value.category = ''
            value.address = ''
            value.price = ''
            value.image = ''
            value.userName = ''
            value.userEmail = ''
            value.userImage = ''
            value.createdAt = ''
          }
        })
      })
  }

  return (
    <KeyboardAvoidingView className="flex-1">
      <ScrollView className="bg-white flex-1">
        <Text className="text-2xl font-bold m-5 text-center">Add Post</Text>
        <Formik
          initialValues={{
            title: '',
            desc: '',
            category: '',
            address: '',
            price: '',
            image: '',
            userName: '',
            userEmail: '',
            userImage: '',
            createdAt: '',
          }}
          onSubmit={value => onSubmitMethod(value)}
          validate={values => {
            const errors = {}
            if (!values.title) {
              errors.title = 'Title is required'
              ToastAndroid.show(errors.title, ToastAndroid.SHORT)
            }
            if (!values.desc) {
              errors.desc = 'Description is required'
              ToastAndroid.show(errors.desc, ToastAndroid.SHORT)
            }
            if (!values.category) {
              errors.category = 'Category is required'
              ToastAndroid.show(errors.category, ToastAndroid.SHORT)
            }
            if (!values.address) {
              errors.address = 'Address is required'
              ToastAndroid.show(errors.address, ToastAndroid.SHORT)
            }
            if (!values.price) {
              errors.price = 'Price is required'
              ToastAndroid.show(errors.price, ToastAndroid.SHORT)
            }
            // if (!values.image) {
            //   errors.image = 'Image is required'
            //   ToastAndroid.show(errors.image, ToastAndroid.SHORT)
            // }
            return errors
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View className="p-7">
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/placeholder.jpg')}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values?.title}
                onChangeText={handleChange('title')}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={values?.desc}
                onChangeText={handleChange('desc')}
                numberOfLines={5}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values?.price}
                onChangeText={handleChange('price')}
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values?.address}
                onChangeText={handleChange('address')}
              />
              {/* Category List Dropdown */}
              <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                <Picker
                  selectedValue={values?.category}
                  onValueChange={itemValue =>
                    setFieldValue('category', itemValue)
                  }
                  style={styles.input}
                >
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item?.name}
                        value={item?.name}
                      />
                    ))}
                </Picker>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                className="p-4 bg-blue-500 rounded-full mt-10"
                style={{
                  backgroundColor: loading ? '#ccc' : '#007BFF',
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <Text className="text-[18px] text-white text-center">
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
})

export default AddPostScreen
