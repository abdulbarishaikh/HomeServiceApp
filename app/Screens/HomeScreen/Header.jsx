import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '@/app/Utils/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Header = () => {
    const { user, isLoading } = useUser();
    const image = user?.imageUrl ? { uri: user?.imageUrl } : require('./../../../assets/user-default-img.png')
    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={image} style={styles.userImage} />
                    <View>
                        <Text style={{ color: Colors.WHITE,fontFamily:"Outfit-Regular" }}>Welcome,</Text>
                        <Text style={{ color: Colors.WHITE, fontSize: 20,fontFamily:"Outfit-Medium" }}>{user?.fullName ?? 'User'}</Text>
                    </View>

                </View>
                <FontAwesome name="bookmark-o" size={27} color={Colors.WHITE} />

            </View>
            {/* Search Bar Section */}
            <View style={styles.searchBarContrainer}>
                <TextInput placeholder='Search' style={styles.textInput}/>
                <FontAwesome name="search" 
                style={styles.searchButton}
                size={24} color={Colors.PRIMARY} />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    searchBarContrainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        marginBottom:10,
        fontFamily:'Outfit-Regular'

    },
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor:Colors.WHITE, 
        width:'85%',
        borderRadius:8,
        fontSize:16
    },
    searchButton:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:8
    }
})