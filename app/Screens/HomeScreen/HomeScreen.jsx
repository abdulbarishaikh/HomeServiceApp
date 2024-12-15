import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import BusinessList from './BusinessList'

const HomeScreen = () => {
  return (
    <ScrollView>
        {/* Header */}
      <Header/>
      <View style={{padding:20}}>
        {/* Slider */}
        <Slider/>
        {/* Categories */}
        <Categories/>
        {/* Business List  */}
        <BusinessList/>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})