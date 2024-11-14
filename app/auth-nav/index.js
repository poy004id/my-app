import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import apiService from '../../services/apiService';

const TextInputExample = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (username, password) => { 
    try {
      const response = await apiService.post('/auth/login', { username,
        password
      });
      console.log(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder='Enter your username'
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <Button
            title="Sign In"
            onPress={() =>  handleLogin(username, password)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
