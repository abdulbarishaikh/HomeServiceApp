import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from '../Navigations/HomeNavigation';
import BookingNavigation from '../Navigations/BookingNavigation';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../Utils/Colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY
        }}>
            <Tab.Screen name="Home" component={HomeNavigation}
                options={{
                    tabBarLabel: ({ color }) => {
                        return <Text style={{ color: color, fontSize: 12, marginTop: -5 }}>Home</Text>
                    },
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="home" size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen name="Booking" component={BookingNavigation}
                options={{
                    tabBarLabel: ({ color }) => {
                        return <Text style={{ color: color, fontSize: 12, marginTop: -5 }}>Booking</Text>
                    },
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="bookmark" size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: ({ color }) => {
                        return <Text style={{ color: color, fontSize: 12, marginTop: -5 }}>Profile</Text>
                    },
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="user-circle" size={size} color={color} />
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigation