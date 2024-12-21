import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '@/app/Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Config from '@/app/Utils/Config';
import { format } from 'date-fns';

const BusinessListItem = ({ business, bookingInfo }) => {
    const navigate = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate.push('business-detail', {
            business: business
        })}>
            <View style={styles.container}>
                <Image source={{ uri: business.images[0].url }}
                    style={styles.image}
                />
                <View style={styles.subContainer}>
                    <Text style={{ fontFamily: 'Outfit-Regular', color: Colors.GRAY, fontSize: 15 }}>{business.contactPerson}</Text>
                    <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 19 }}>{business.name}</Text>


                    {bookingInfo?.id ?
                        <View>
                            <Text style={{
                                fontFamily: 'Outfit-Medium',
                                fontSize: 10,
                                padding: 3,
                                color: bookingInfo?.bookingStatus == 'completed' ? Colors.SUCCESS : bookingInfo?.bookingStatus == 'cancelled'?Colors.DANGER:bookingInfo?.bookingStatus == 'inProgress' ?Colors.WARNING:Colors.PRIMARY,
                                backgroundColor: bookingInfo?.bookingStatus == 'completed' ? Colors.SUCCESS_LIGHT : bookingInfo?.bookingStatus == 'cancelled'?Colors.DANGER_LIGHT:bookingInfo?.bookingStatus == 'inProgress' ?Colors.WARNING_LIGHT:Colors.PRIMARY_LIGHT,
                                borderRadius: 3,
                                alignSelf: 'flex-start'
                            }}>{bookingInfo?.bookingStatus}
                            </Text>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: "center", marginTop: 5 }}>
                                <Ionicons name="calendar-sharp" size={20} color={Colors.PRIMARY} />
                                <Text>{format(bookingInfo?.date, Config.dateFormat)}</Text>
                                <Text>{bookingInfo?.time}</Text>

                            </View>
                        </View>
                        :
                        <Text style={{ fontFamily: 'Outfit-Regular', color: Colors.GRAY, fontSize: 16 }}>
                            <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
                            {business.address}
                        </Text>
                    }

                </View>

            </View>
        </TouchableOpacity>
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