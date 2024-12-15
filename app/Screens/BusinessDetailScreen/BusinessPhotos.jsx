import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

const BusinessPhotos = ({ business }) => {
    return (
        <View>
            <FlatList
                data={business.images}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <Image style={{ width: '100%',flex:1, height: 120,borderRadius:15,margin:7 }} source={{ uri: item.url }} />)
                }
            />
        </View>
    )
}

export default BusinessPhotos

const styles = StyleSheet.create({})