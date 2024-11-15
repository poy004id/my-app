import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Text,
  Button,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiService from '@/services/apiService';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const FABWithModal = ({getStaseData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [staseNm, setStaseNm] = useState('');

  const handleSubmit = async () => {
    try {
        setModalVisible(false);
        const response = await apiService.post('/stase', {staseNm : staseNm});
        setStaseNm('');
        console.log('response', response);
        if (response.status === 200) {
            getStaseData();
        }
    } catch (error) {
        console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Stase</Text>

            {/* Form Inputs */}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={staseNm}
              onChangeText={(text) => setStaseNm(text)}
            />
            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FABWithModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
