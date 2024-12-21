import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import CalendarPicker from "react-native-calendar-picker";
import Colors from '@/app/Utils/Colors';
import Heading from '@/app/Components/Heading';
import { TextInput } from 'react-native-gesture-handler';
import GlobalApi from '@/app/Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns'

const BookingModal = ({ businessId, hideModal }) => {

    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [note, setNote] = useState();
    const [bookedTimes, setBookedTimes] = useState([]);
    const onDateChange = (date) => {
        setSelectedDate(format(date, 'yyyy-MM-dd'));
    }
    const { user } = useUser();
    useEffect(() => {
        getTimeList();
        getBookedTimes();
    }, []);

    const getTimeList = () => {
        const timeListArr = [];
        for (let i = 8; i <= 12; i++) {
            timeListArr.push({
                time: i + ':00 AM'
            })
            timeListArr.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i <= 7; i++) {
            timeListArr.push({
                time: i + ':00 PM'
            })
            timeListArr.push({
                time: i + ':30 PM'
            })
        }
        setTimeList(timeListArr);

    }
    const createNewBooking = () => {
        if (!selectedTime || !selectedDate) {
            ToastAndroid.show('Please Select Date And Time', ToastAndroid.LONG)
            return;
        }
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectedTime,
            date: selectedDate,
            // note:note,
            businessId: businessId
        }
        GlobalApi.createBooking(data).then((res) => {
            if (res.createBooking) {
                GlobalApi.publishedBooking(res.createBooking.id).then((res) => {
                });
            }
            ToastAndroid.show('Booking Created Successfully', ToastAndroid.LONG)
            hideModal();
        });
    }
    const getBookedTimes = () => {
        GlobalApi.getBookedTimes(businessId).then(res => setBookedTimes(res.bookings))
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView style={{ padding: 20 }}>
                <TouchableOpacity
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
                    onPress={() => hideModal()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                    <Text style={{ fontSize: 25, fontFamily: 'Outfit-Medium' }}>Booking</Text>

                </TouchableOpacity>
                <Heading text={'Select Date'} />
                <View style={styles.calendarContainer}>
                    <CalendarPicker onDateChange={onDateChange}
                        width={320}
                        minDate={Date.now()}
                        todayBackgroundColor={Colors.BLACK}
                        todayTextStyle={{
                            color: Colors.WHITE
                        }}
                        selectedDayColor={Colors.PRIMARY}
                        selectedDayTextColor={Colors.WHITE}
                    // disabledDates=
                    />

                </View>
                <View style={{ marginTop: 20 }}>
                    <Heading text={'Select Time Slot'} />
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedTime(item.time)}
                                disabled={bookedTimes.length > 0 && bookedTimes.some(({ time }) => time === item.time)}
                                style={{ paddingHorizontal: 2 }}
                            >
                                {
                                    bookedTimes.some(({ time, date }) => time === item.time && format(date, 'yyyy-MM-dd') == selectedDate) ?
                                        <Text style={[styles.unSelectedTime, {
                                            backgroundColor: Colors.SUCCESS_LIGHT,
                                            color: Colors.SUCCESS,
                                            borderColor: Colors.SUCCESS_LIGHT
                                        }]}>
                                            {'Booked'}
                                        </Text>
                                        :
                                        <Text style={[selectedTime == item.time ? styles.selectedTime : styles.unSelectedTime]}>
                                            {item.time}
                                        </Text>
                                }
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Heading text={'Note'} />
                    <TextInput
                        placeholder='Enter Note'
                        numberOfLines={5}
                        minHeight={150}
                        multiline={true}
                        style={styles.noteInput}
                        onChange={(text) => setNote(text)}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={createNewBooking}>
                    <Text style={styles.confirmBtn}>Confirm & Book</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </ScrollView>
    )
}

export default BookingModal

const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 20,
        borderRadius: 15
    },
    selectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE
    },
    unSelectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: Colors.PRIMARY
    },
    noteInput: {
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: 20,
        fontSize: 16,
        fontFamily: 'Outfit-Regular',
        borderColor: Colors.PRIMARY_LIGHT
    },
    confirmBtn: {
        textAlign: 'center',
        fontFamily: 'Outfit-Medium',
        fontSize: 17,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        padding: 13,
        borderRadius: 99,
        elevation: 2
    }
})