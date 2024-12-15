import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/app/Utils/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const BusinessListItem = ({ business }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: business.images[0].url }}
                style={styles.image}
            />
            <View style={styles.subContainer}>
                <Text style={{ fontFamily: 'Outfit-Regular', color: Colors.GRAY, fontSize: 15 }}>{business.contactPerson}</Text>
                <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 19 }}>{business.name}</Text>
                <Text style={{ fontFamily: 'Outfit-Regular', color: Colors.GRAY, fontSize: 16 }}>
                    <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
                    {business.address}
                </Text>

            </View>
        </View>
    )
}

export default BusinessListItem

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    subContainer: {
        display: 'flex',
        gap: 8
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15
    }
})