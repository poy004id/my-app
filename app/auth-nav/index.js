import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

import {loginSuccess, loginFailure} from '../../redux/slice/auth';
import {useDispatch} from 'react-redux';

import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const TextInputExample = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async (username, password) => { 
    try {
      const hashedMD5Password = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        password
      );

      const hashedSHA256Password = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        hashedMD5Password
      );

      console.log("hashedPassword", hashedSHA256Password);
      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/login`, {
        username,
        password: hashedSHA256Password});
      console.log(response.data);

      dispatch(loginSuccess({ user: response.data.data.user }));
      await SecureStore.setItemAsync('accessToken', response.data.data.accessToken  );
      await SecureStore.setItemAsync('refreshToken', response.data.data.refreshToken  );

    }
    catch (error) {
      console.error("error", error);
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
