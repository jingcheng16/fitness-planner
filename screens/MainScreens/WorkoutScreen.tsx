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
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import WorkoutItem from "../../components/WorkoutItem";
import ExerciseInput from "../../components/ExerciseInput";
import LoadingModal from "../../components/LoadingModal";
import getCurrentDate from "../../components/CurrentDate";
import database from "../../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";

export default function WorkoutScreen() {
  const [exerciseList, setExerciseList] = useState<
    { id: string; value: string }[]
  >([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isSaveMode, setIsSaveMode] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());
  const [dateList, setDateList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const url = "https://us-east4-recirclable-dev.cloudfunctions.net/call-ping";

  const jsonBody = {
    data: {
      args: ["wait"],
    },
  };

  const pingFunction = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, jsonBody);
      if (response.data.result.success) {
        setIsLoading(false);
      }
      setTimeout(() => setIsSaveMode(false), 2000);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setTimeout(() => {
        setIsSaveMode(false);
        setIsError(false);
      }, 2000);
    }
  };

  const saveHandler = () => {
    setIsSaveMode(true);
    storeData();
    pingFunction();
  };

  const addExerciseHandler = (exerciseTitle: string) => {
    if (exerciseTitle != "") {
      setExerciseList((currentList) => [
        ...currentList,
        { id: Math.random().toString(), value: exerciseTitle },
      ]);
    }
    setIsAddMode(false);
  };

  const removeExerciseHandler = (exerciseId: string) => {
    setExerciseList((currentList) => {
      return currentList.filter((exercise) => exercise.id !== exerciseId);
    });
  };

  const cancelExerciseAdditionHandler = () => {
    setIsAddMode(false);
  };

  async function storeData() {
    console.log("try store data");
    try {
      const reference = ref(database, currentDate);
      const res = await set(reference, { exerciseList });
    } catch (error) {
      setIsError(true);
      console.log("Error! 💥");
    }
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new Exercise" onPress={() => setIsAddMode(true)} />
      <ExerciseInput
        visible={isAddMode}
        onAddExercise={addExerciseHandler}
        onCancel={cancelExerciseAdditionHandler}
      />
      <FlatList<{ id: string; value: string }>
        //keyExtractor={(item, index) => item.id}
        data={exerciseList}
        renderItem={(itemData) => (
          <WorkoutItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeExerciseHandler}
          />
        )}
      />
      <Button
        title={isSaveMode ? "saving..." : "save"}
        disabled={isSaveMode}
        onPress={saveHandler}
      />
      <LoadingModal
        visible={isSaveMode}
        isLoading={isLoading}
        isError={isError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  horizontal: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
});
