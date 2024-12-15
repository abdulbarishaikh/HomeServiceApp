import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors'

const BusinessListItemSmall = ({ business }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: business?.images[0]?.url }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={{
          fontSize: 17,
          fontFamily: 'Outfit-Medium',

        }}>{business.name}</Text>
        <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.GRAY }}>{business.contactPerson}</Text>
        <Text style={{
          fontSize: 10,
          fontFamily: 'Outfit-Regular',
          padding: 3,
          color: Colors.PRIMARY,
          backgroundColor: Colors.PRIMARY_LIGHT,
          borderRadius: 3,
          alignSelf: 'flex-start',
          paddingHorizontal: 7
        }}>{business.category.name}</Text>
      </View>
    </View>
  )
}

export default BusinessListItemSmall

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10
  },
  infoContainer: {
    padding: 7,
    display: 'flex',
    gap: 3
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10
  },
})