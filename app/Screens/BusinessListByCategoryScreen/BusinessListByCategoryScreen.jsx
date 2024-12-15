import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalApi from '@/app/Utils/GlobalApi';
import { FlatList } from 'react-native-gesture-handler';
import BusinessListItem from './BusinessListItem'
import Colors from '@/app/Utils/Colors';

const BusinessListByCategoryScreen = () => {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [businessList, setBusinessList] = useState([]);
    useEffect(() => {
        param && getBusinessByCategory();

    }, [param])

    const getBusinessByCategory = () => {
        GlobalApi.getBusinessListByCategory(param.category).then(res => { setBusinessList(res.businessLists) })
    }

    return (
        <View style={{ padding: 20, paddingTop: 30 }}>
            <TouchableOpacity
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-outline" size={24} color="black" />
                <Text style={{ fontSize: 25, fontFamily: 'Outfit-Medium' }}>{param?.category}</Text>

            </TouchableOpacity>
            {businessList?.length > 0 ? <FlatList
                data={businessList}
                renderItem={({ item, index }) =>
                    <BusinessListItem business={item} />
                }
            /> : <Text style={{ color: Colors.GRAY, fontFamily: 'Outfit-Medium', fontSize: 20, textAlign: 'center', marginTop: '20%' }}>No Business Found</Text>}
        </View>
    )
}

export default BusinessListByCategoryScreen

const styles = StyleSheet.create({})