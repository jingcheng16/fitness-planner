// import * as React from 'react';
// import { StyleSheet, Button, Text, View } from 'react-native';

import React, { useState, useEffect } from "react";
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
} from "firebase/database";
import database from "../../firebase";

export default function LogScreen() {
  const [exerciseList, setExerciseList] = useState<
    { id: string; value: string }[]
  >([]);
  const [date, setDate] = useState<string>(getCurrentDate());

  //   const getData = () => {
  //     if (date) {
  //       console.log("date" + date);
  //       const ListRef = ref(database, date);
  //       get(ListRef)
  //         .then((snapshot) => {
  //           if (snapshot.exists()) {
  //             const data = snapshot.val();
  //             console.log(data);
  //             const exerciseObjectArray = data.exerciseList;
  //             setExerciseList(exerciseObjectArray);
  //           } else {
  //             setExerciseList([]);
  //             console.log("No data available");
  //           }
  //         })
  //         .catch((error) => console.error(error));
  //     }
  //   };

  useEffect(() => getData(), [date]);

  const getData = () => {
    if (date) {
      console.log("date" + date);
      const ListRef = ref(database, date);
      return onValue(ListRef, (snapshot) => {
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
  };

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
