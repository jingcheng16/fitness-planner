// import * as React from 'react';
// import { StyleSheet, Button, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import WorkoutItem from '../../components/WorkoutItem';
import ExerciseInput from '../../components/ExerciseInput';
import LoadingModal from '../../components/LoadingModal';

//newly added
import database from '../../firebase'
import { getDatabase, ref, onValue, set } from 'firebase/database';

export default function WorkoutScreen() {
    const [exerciseList, setExerciseList] = useState<{ id: string, value: string }[]>([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isSaveMode, setIsSaveMode] = useState(false);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [dateList, setDateList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const url = "https://us-east4-recirclable-dev.cloudfunctions.net/call-ping";



    useEffect(() => { getCurrentDate() }, []);

    const jsonBody = {
        data: {
            args: ["wait"]
        }
    }

    const pingFunction = async () => {
        try {
            const response = await axios.post(url, jsonBody);
            console.log(response.data.result.success)
            if (response.data.result.success) {
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const cancelSaveModeHandler = () => {
        setIsSaveMode(false);
        setIsLoading(false);
    }

    const saveHandler = () => {
        setIsLoading(true)
        setIsSaveMode(true)
        storeData()
        pingFunction()
    }

    const addExerciseHandler = (exerciseTitle: string) => {
        if (exerciseTitle != '') {
            setExerciseList(currentList => [...currentList, { id: Math.random().toString(), value: exerciseTitle }]);
        }
        setIsAddMode(false);

    };

    const removeExerciseHandler = (exerciseId: string) => {
        setExerciseList(currentList => {
            return currentList.filter(exercise => exercise.id !== exerciseId);
        })
    }

    const cancelExerciseAdditionHandler = () => {
        setIsAddMode(false);
    }



    const getCurrentDate = () => {
        let stringDate: string;
        let stringMonth: string;
        let date = new Date().getDate();
        if (date < 10) {
            stringDate = "0" + date;
        } else {
            stringDate = date + "";
        }
        let month = new Date().getMonth() + 1;
        if (month < 10) {
            stringMonth = "0" + month;
        } else {
            stringMonth = month + "";
        }
        let year = new Date().getFullYear();

        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        setCurrentDate(year + '-' + stringMonth + '-' + stringDate);
    }

    function storeData() {
        console.log('try store data');
        const db = getDatabase();
        const reference = ref(database, currentDate);
        set(reference, {
            exerciseList,
        });
    }

    return (
        <View style={styles.screen}>
            <Button title="Add new Exercise" onPress={() => setIsAddMode(true)} />
            <ExerciseInput visible={isAddMode} onAddExercise={addExerciseHandler} onCancel={cancelExerciseAdditionHandler} />
            <FlatList<{ id: string, value: string }>
                //keyExtractor={(item, index) => item.id}
                data={exerciseList}
                renderItem={(itemData) =>
                    <WorkoutItem id={itemData.item.id} title={itemData.item.value} onDelete={removeExerciseHandler} />
                }
            />
            <Button title="save" onPress={saveHandler} />
            <LoadingModal visible={isSaveMode} isLoading={isLoading} onCancel={cancelSaveModeHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    horizontal: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
    listItem: {
        padding: 10,
        marginVertical: 10,
        borderColor: 'grey',
        borderWidth: 1,
    },
})