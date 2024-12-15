import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/app/Utils/Colors';
import BusinessPhotos from './BusinessPhotos'
import BusinessAboutMe from './BusinessAboutMe'
import BookingModal from './BookingModal'

const BusinessDetailScreen = () => {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [business, setBusiness] = useState(param.business)
    const [showModal, setShowModal] = useState(false)

    return (
        <View>
            <ScrollView height={'91%'}>
                <TouchableOpacity
                    style={{ position: 'absolute', zIndex: 99, padding: 18 }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
                    <Text style={{ fontSize: 25, fontFamily: 'Outfit-Medium' }}>{param?.category}</Text>

                </TouchableOpacity>
                <Image source={{ uri: business?.images[0].url }} style={{ width: '100%', height: 300 }} />
                <View style={{ padding: 20, display: 'flex', gap: 7 }}>
                    <Text style={{ fontFamily: 'Outfit-Bold' }}>{business?.name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
                        <Text style={styles.category}>{business?.category?.name}</Text>

                    </View>
                    <Text style={{ fontSize: 17, fontFamily: 'Outfit-Regular' }}>
                        <Ionicons name="location-sharp" size={25} color={Colors.PRIMARY} />
                        {business?.address}
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <BusinessAboutMe business={business} />
                    <View style={styles.horizontalLine}></View>
                    <BusinessPhotos business={business} />
                </View>
            </ScrollView>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'Outfit-Medium',
                        color: Colors.PRIMARY,
                        fontSize: 18
                    }}>Message</Text>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.PRIMARY}]}
                    onPress={()=>setShowModal(true)}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'Outfit-Medium',
                        color: Colors.WHITE,
                        fontSize: 18
                    }}>Book Now </Text>

                </TouchableOpacity>
            </View>
            <Modal
                animationType='slide'
                visible={showModal}
            >
                <BookingModal hideModal={()=>{
                    setShowModal(false);
                }}/>
            </Modal>
        </View>
    )
}

export default BusinessDetailScreen

const styles = StyleSheet.create({
    contactPerson: {
        fontFamily: 'Outfit-Medium',
        color: Colors.PRIMARY,
        fontSize: 20
    },
    category: {
        fontFamily: 'Outfit-Regular',
        color: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 5,
        borderRadius: 5,
        fontSize: 14
    },
    horizontalLine: {
        borderWidth: 0.4,
        borderColor: Colors.GRAY,
        marginTop: 20,
        marginBottom: 20
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin:8,
        gap:8
    },
    btn: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex:1

    }
})