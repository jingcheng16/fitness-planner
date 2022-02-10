// import * as React from 'react';
// import { StyleSheet, Button, Text, View } from 'react-native';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
//https://github.com/wix/react-native-calendars
import ExerciseItem from '../../components/ExerciseItem';

import { getDatabase, ref, child, get, onValue, query, orderByKey } from "firebase/database";
import database from '../../firebase'

export default function LogScreen() {
    // useEffect(() => { getData() }, [])
    // useEffect(() => { getDateList() }, [])

    const [exerciseList, setExerciseList] = useState<{ id: string, value: string }[]>([]);
    const [date, setDate] = useState<string>("");
    //const [dateList, setDateList] = useState<string[]>([]);

    // const dbRef = ref(database);
    // useEffect(() => {
    //     get(child(dbRef, date)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val());
    //             const exerciseObjectArray = snapshot.val().exerciseList;
    //             setExerciseList(exerciseObjectArray);
    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }, [])

    // useEffect(() => {

    //     getData(date);

    // }, [])

    const getData = (currdate: string) => {
        if (currdate) {
            console.log("date" + currdate);
            const starCountRef = ref(database, currdate);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log(data);
                    const exerciseObjectArray = data.exerciseList;
                    setExerciseList(exerciseObjectArray);
                } else {
                    setExerciseList([]);
                    console.log("No data available");
                }
            });
        }
    }

    // const getDateList = async () => {
    //     try {
    //         // the '@profile_info' can be any string
    //         const jsonValue = await AsyncStorage.getItem('@dateList')
    //         console.log(jsonValue);
    //         let data = null
    //         if (jsonValue != null) {
    //             data = JSON.parse(jsonValue)
    //             setDateList(data)
    //             console.log('just set Date List')
    //         } else {
    //             console.log('just read a null date list from Storage')
    //             // setDateList([])
    //         }


    //     } catch (e) {
    //         console.log("error in getData ")
    //         console.dir(e)
    //         // error reading value
    //     }
    // }

    // const getData = async (value?: string) => {
    //     try {
    //         // the '@profile_info' can be any string
    //         console.log(value);
    //         if (value) {
    //             const jsonValue = await AsyncStorage.getItem(value)
    //             let data = null
    //             if (jsonValue != null) {
    //                 data = JSON.parse(jsonValue)
    //                 setExerciseList(data)
    //                 console.log('just set Exercise List')
    //             } else {
    //                 console.log('just read a null list from Storage')
    //                 setExerciseList([])
    //             }
    //         }



    //     } catch (e) {
    //         console.log("error in getData ")
    //         console.dir(e)
    //         // error reading value
    //     }
    // }

    return (
        <View>
            {/* <Button title="get" onPress={() => getDateList()} /> */}
            <Calendar
                minDate={'2021-11-01'}
                //maxDate={new Date()}
                onDayPress={(day) => {
                    setDate(day.dateString);
                    getData(day.dateString);

                }}
            />
            {/* {dateList.map(date => (
                <TouchableOpacity onPress = {()=> getData(date)}>
                    <Text key={date}>{date}</Text> 
                </TouchableOpacity>
            ))} */}
            <Text>{date}</Text>
            {exerciseList.map(exercise => (<ExerciseItem key={exercise.id} title={exercise.value}>{exercise.value}</ExerciseItem>))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});