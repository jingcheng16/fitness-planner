// import * as React from 'react';
// import { StyleSheet, Button, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WorkoutItem from '../../components/WorkoutItem';
import ExerciseInput from '../../components/ExerciseInput';

export default function WorkoutScreen() {
    const [exerciseList, setExerciseList] = useState<{ id: string, value: string }[]>([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [dateList, setDateList] = useState<string[]>([]);

    useEffect(() => { getCurrentDate() }, []);

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
        let date = new Date().getDate();
        if (date < 10) {
            stringDate = "0" + date;
        } else {
            stringDate = date + "";
        }
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();

        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        setCurrentDate(year + '-' + month + '-' + stringDate);
    }

    const storeData = async (value: { id: string, value: string }[]) => {
        try {
            const jsonValue = JSON.stringify(value)
            console.log(currentDate.toString());
            await AsyncStorage.setItem(currentDate.toString(), jsonValue)
            console.log('just stored ' + currentDate.toString() + jsonValue)
            if (dateList.indexOf(currentDate.toString()) < 0) {
                setDateList([...dateList, currentDate.toString()])
            }
            const jsonValue2 = JSON.stringify(dateList);
            await AsyncStorage.setItem("@dateList", jsonValue2)
        } catch (e) {
            console.log("error in storeData ")
            console.dir(e)
            // saving error
        }
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
            <Button title="save" onPress={() => storeData(exerciseList)} />

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