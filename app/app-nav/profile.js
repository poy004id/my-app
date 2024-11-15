import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/auth';
import * as SecureStore from 'expo-secure-store';

const profile = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        SecureStore.deleteItemAsync('accessToken');
        SecureStore.deleteItemAsync('refreshToken');
    }
    return (
        <SafeAreaView>
            {/* <View style={{  }}> */}
                <Text>profile</Text>
                <Button title="Logout" onPress={() => handleLogout()} />
            {/* </View> */}
        </SafeAreaView>
    )
}

export default profile

const styles = StyleSheet.create({})