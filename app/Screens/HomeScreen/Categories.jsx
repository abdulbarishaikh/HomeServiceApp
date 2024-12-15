import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/Utils/GlobalApi'
import Heading from '@/app/Components/Heading'
import Colors from '@/app/Utils/Colors'
import { useNavigation } from '@react-navigation/native'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const navigation = useNavigation();
    const getCategories = () => {
        GlobalApi.getCategory().then(res => {
            setCategories(res?.categories)
        })
    }
    useEffect(() => {
        getCategories();
    }, [])
    return (
        <View>
            <Heading text={"Categories"} isViewAll={true} />
            <FlatList

                data={categories}
                numColumns={4}
                renderItem={({ item, index }) =>
                    index <= 3 &&
                    <TouchableOpacity style={styles.contrainer}
                        onPress={() => {
                            navigation.push('business-list', {
                                category: item.name
                            })
                        }}
                    >
                        <View style={styles.iconContainer}>
                            <Image source={{ uri: item.icon.url }}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <Text style={{ fontFamily: 'Outfit-Medium', marginTop: 5 }}>{item.name}</Text>
                    </TouchableOpacity>
                } />
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    contrainer: {
        flex: 1,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 17,
        borderRadius: 99,
    }
})