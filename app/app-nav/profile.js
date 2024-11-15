import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/auth';

const profile = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
  return (
    <View>
      <Text>profile</Text>
      <Button title="Logout" onPress={() => handleLogout() } />
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})