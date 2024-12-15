import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Heading from '@/app/Components/Heading';
import Colors from '@/app/Utils/Colors';

const BusinessAboutMe = ({business}) => {
    const [isMore, setIsMore] = useState(false);
    return (
        <View>
            <Heading text={'About Me'} />
            <Text
                style={{
                    fontFamily: 'Outfit-Regular',
                    color: Colors.GRAY,
                    fontSize: 16,
                    lineHeight: 28
                }}
                numberOfLines={isMore ? 0 : 5}
            >
                {business.about}
            </Text>
            <TouchableOpacity onPress={() => { setIsMore(!isMore) }}>
                <Text style={{
                    color: Colors.PRIMARY,
                    fontSize: 16,
                    fontFamily: 'Outfit-Regular'
                }}>
                    {isMore ? 'Less More' : 'Read More'}
                </Text>

            </TouchableOpacity>
        </View>
    )
}

export default BusinessAboutMe

const styles = StyleSheet.create({})