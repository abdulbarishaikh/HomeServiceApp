import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen';

const Stack = createStackNavigator();
const BookingNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='booking' component={BookingScreen} />
            <Stack.Screen name='business-detail' component={BusinessDetailScreen} />
        </Stack.Navigator>
    )
}

export default BookingNavigation