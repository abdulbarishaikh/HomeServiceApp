import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem';

const BookingScreen = () => {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser();
  useEffect(() => {
    // GlobalApi.getUserdBooking(user.primaryEmailAddress.emailAddress);
    user && getUserdBooking();
  }, []);
  const getUserdBooking = () => {
    setIsLoading(true);
    GlobalApi.getUserdBooking(user.primaryEmailAddress.emailAddress).then(res => {
      setBookings(res.bookings)
      setIsLoading(false)
    });
  }
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 26 }}>My Booking</Text>
      <View>
        <FlatList
          data={bookings}
          renderItem={({ item, index }) => (
            <BusinessListItem business={item?.business}
              bookingInfo={item}
            />

          )}
          onRefresh={()=>getUserdBooking()}
          refreshing={isLoading}
        />
      </View>
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({})