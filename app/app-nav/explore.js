import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import apiService from '@/services/apiService';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FABWithModal from '@/section/explore/FAB';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Explore = () => {
  const [staseData, setStaseData] = useState([]);
  const flatListRef = useRef(null); // Reference for FlatList
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');


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

  const filterData = (data) => {
    if (!search.trim()) {
      return data; // Return unfiltered data if search is empty or only spaces
    }
    return data.filter((item) =>
      item.staseNm.toLowerCase().includes(search.toLowerCase())
    );
  };
  
  useEffect(() => {
    getStaseData();
  }, []);

  const Item = ({ title, statusCd }) => (
    <TouchableOpacity  onLongPress={() => showDetail(title, statusCd)} style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ fontSize: 10 }}>{statusCd}</Text>
      </View>
    </TouchableOpacity>
  );

  const showDetail = (title, statusCd) => {
    setSelectedItem({ title, statusCd });
    setModalVisible(true);
  };



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>Stase</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 , padding: 10, borderRadius: 5}}
            placeholder="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <FlatList
            ref={flatListRef}
            data={filterData(staseData)}
            renderItem={({ item }) => <Item title={item.staseNm} statusCd={item.statusCd} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            // onEndReached={() => scrollToTop()}
            ListFooterComponent={() => <View style={{ height: 60 }} />}
            refreshing={refreshing} // Add refreshing prop
            onRefresh={onRefresh} // Add onRefresh handler
          />
          <FABWithModal getStaseData={getStaseData} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Detail Stase</Text>
                  <Text style={styles.modalText}>Title: {selectedItem?.title}</Text>
                  <Text style={styles.modalText}>Status Code: {selectedItem?.statusCd}</Text>
                  <Text>Doraemon is a fictional title character in the Japanese manga and anime eponymous series created by Fujiko F. Fujio. Doraemon is a male robotic earless cat that travels back in time from the 22nd century to aid a preteen boy named Nobita. Wikipedia</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff', // Customize your preferred color here
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, // Android shadow
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});
