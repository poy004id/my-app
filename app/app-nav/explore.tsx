import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import apiService from '@/services/apiService'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const Explore = () => {

  const [staseData, setStaseData] = useState([])

  const getStaseData = async () => {
    try {
      const response = await apiService.get('/stase')
      // console.log("response", response.data.data)
      if (response.status == 200) {
        setStaseData(response.data.data)
      }

    } catch (error) {
      console.log("error", error)
    }
  }

  console.log("staseData", staseData)

  useEffect(() => {
    getStaseData()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{padding:20}}>
          <Text>Explore</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Explore

const styles = StyleSheet.create({})