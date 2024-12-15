import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from './../../Utils/GlobalApi';
import Heading from './../../Components/Heading';

const Slider = () => {
    const [sliders, setSliders] = useState([])
    const getSliders = () => {
        GlobalApi.getSlider().then(res => {
            setSliders(res?.sliders)
        })
    }
    useEffect(() => {
        getSliders();
    }, [])
    return (
        <View>
            <Heading text={"Offers for you"} />
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={sliders}
                renderItem={({ item, index }) => <View style={{ marginRight: 20 }}>
                    <Image source={{ uri: item.image?.url }} style={styles.sliderImage} />
                </View>} />
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    sliderImage: {
        width: 270,
        height: 150,
        borderRadius: 30,
        objectFit: 'contain',
    }
})