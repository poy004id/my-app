import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import apiService from '@/services/apiService';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Explore = () => {
  const [staseData, setStaseData] = useState([]);
  const flatListRef = useRef(null); // Reference for FlatList
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  const onRefresh = () => {
    setRefreshing(true);
    getStaseData();
    setRefreshing(false);
  };
  

  const getStaseData = async () => {
    try {
      const response = await apiService.get('/stase');
      if (response.status === 200) {
        setStaseData(response.data.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('staseData [0]', staseData[0]);

  useEffect(() => {
    getStaseData();
  }, []);

  const Item = ({ title, statusCd }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{fontSize:10}}>{statusCd}</Text>
    </View>
  );


  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>Stase</Text>
          <FlatList
            ref={flatListRef}
            data={staseData}
            renderItem={({ item }) => <Item title={item.staseNm}  statusCd={item.statusCd}/>}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={() => scrollToTop()}
            refreshing={refreshing} // Add refreshing prop
            onRefresh={onRefresh} // Add onRefresh handler
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Explore;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background for better contrast
  },
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker text for better readability
  },
  flatListContent: {
    paddingBottom: 20, // Adds spacing at the bottom
  },
  item: {
    backgroundColor: '#ffffff', // White background for each item
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Adds subtle elevation for Android
    marginVertical: 8, // Spacing between items
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444', // Darker color for text
  },
  separator: {
    height: 8, // Spacing between items
  },
});
