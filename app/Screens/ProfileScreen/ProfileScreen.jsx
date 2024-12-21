import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Ionicons } from '@expo/vector-icons';
import Colors, { PRIMARY_BTN } from '@/app/Utils/Colors';

const ProfileScreen = () => {
  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home'
    },
    {
      id: 2,
      name: 'My Booking',
      icon: 'bookmark-sharp'
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'bookmark-sharp'
    },
    {
      id: 3,
      name: 'Logout',
      icon: 'log-out'
    },
  ];
  const { signOut } = useAuth();
  const { user } = useUser();
  const doLogout = () => {
    signOut();
  };
  return (
    <View>
      <View style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}>
        <Text style={{ fontSize: 30, fontFamily: 'Outfit-Bold',color:Colors.WHITE }}>Profile</Text>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
          <Image source={{ uri: user?.imageUrl }} style={{ width: 90, height: 90, borderRadius: 99 }} />
          <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 26, marginTop: 8, color: Colors.WHITE }}>{user.fullName}</Text>
          <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 18, marginTop: 8, color: Colors.WHITE }}>{user.primaryEmailAddress.emailAddress}</Text>
        </View>

        {/* <Pressable onPress={doLogout} style={{ marginBottom: 'auto' }}>
        <Ionicons name="log-out-outline" size={24} color={'black'} />
        <Text style={[PRIMARY_BTN]}>Logout</Text>
      </Pressable> */}
      </View>
      <View style={{paddingTop:60}}>
        <FlatList
          data={profileMenu}
          renderItem={({item,index})=>(
            <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10,marginBottom:40,
              paddingHorizontal:80,
              paddingTop:10
            }}>
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontFamily:'Outfit-Regular',fontSize:20,}}>{item.name}</Text>

            </TouchableOpacity>
          )}
        />
      </View>

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})