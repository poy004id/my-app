import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import apiService from '@/services/apiService'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const Explore = () => {

  const [staseData, setStaseData] = useState([])

  const getStaseData = async () => {
    try {
      const response = await apiService.get('/stase')
      if (response.status == 200) {
        setStaseData(response.data.data)
      }

    } catch (error) {
      console.log("error", error)
    }
  }

  console.log("staseData [0]", staseData[0])

  useEffect(() => {
    getStaseData()
  }, [])

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{padding:20}}>
          <Text>Stase</Text>


          <FlatList
            data={staseData}
            renderItem={({item}) => <Item title={item.staseNm} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Explore

const styles = StyleSheet.create({})