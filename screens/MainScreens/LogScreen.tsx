// import * as React from 'react';
// import { StyleSheet, Button, Text, View } from 'react-native';

import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
//https://github.com/wix/react-native-calendars
import ExerciseItem from "../../components/ExerciseItem";
import getCurrentDate from "../../components/CurrentDate";

import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  query,
  orderByKey,
  Unsubscribe,
} from "firebase/database";
import database from "../../firebase";

export default function LogScreen() {
  const [exerciseList, setExerciseList] = useState<
    { id: string; value: string }[]
  >([]);
  const [date, setDate] = useState<string>(getCurrentDate());

  const getData = (selectedDate: string) => {
    let returnArray: { id: string; value: string }[] = [];
    if (selectedDate) {
      console.log("date" + selectedDate);
      const ListRef = ref(database, selectedDate);
      onValue(ListRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          returnArray = data.exerciseList;
        }
      });
    }
    return returnArray;
  };
  const unsubscribe = useCallback(() => getData(date), [date]);

  useEffect(() => {
    unsubscribe();
    setExerciseList(getData(date));
  }, [date]);

  return (
    <View>
      <Calendar
        minDate={"2021-11-01"}
        //maxDate={new Date()}
        onDayPress={(day) => {
          setDate(day.dateString);
        }}
      />
      <Text>{date}</Text>
      {exerciseList.map((exercise) => (
        <ExerciseItem key={exercise.id} title={exercise.value}>
          {exercise.value}
        </ExerciseItem>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
