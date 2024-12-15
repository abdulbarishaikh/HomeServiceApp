import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '@/app/Components/Heading'
import GlobalApi from '@/app/Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall';

const BusinessList = () => {
    const [businessList, setBusinessList] = useState([])
    const getBusinessList = () => {
        GlobalApi.getBusinessList().then(res => {
            setBusinessList(res?.businessLists)
        })
    }
    useEffect(() => {
        getBusinessList();
    }, [])
    return (
        <View style={{ marginTop: 20 }}>
            <Heading text={"Latest Business"} isViewAll={true} />
            <FlatList
                data={businessList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <View style={{ marginRight: 10 }}>
                        <BusinessListItemSmall business={item} />
                    </View>
                } />
        </View>
    )
}

export default BusinessList

const styles = StyleSheet.create({})