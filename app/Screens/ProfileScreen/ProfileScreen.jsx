import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { SignInButton, SignOutButton, useAuth } from '@clerk/clerk-react'
import Colors, { PRIMARY_BTN } from '@/app/Utils/Colors';

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const doLogout = () => {
    signOut();
  };
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Pressable onPress={doLogout} style={{marginBottom:'auto'}}>
        {/* <Ionicons name="log-out-outline" size={24} color={'#fff'} /> */}
        <Text style={[PRIMARY_BTN]}>Logout</Text>
      </Pressable>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})