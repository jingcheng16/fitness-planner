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
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPingError, setIsPingError] = useState<boolean>(false);
  const [isStoreDataError, setIsStoreDataError] = useState<boolean>(false);
  const [showWorkingStatus, setShowWorkingStatus] = useState<boolean>(false);
  const url = "https://us-east4-recirclable-dev.cloudfunctions.net/call-ping";

  const jsonBody = {
    data: {
      args: ["wait"],
    },
  };

  useEffect(() => {
    setHasError(isPingError || isStoreDataError);
  }, [isPingError, isStoreDataError]);

  useEffect(() => {
    UIManagement(isLoading, isSaveMode);
  }, [isLoading, isSaveMode]);

  const UIManagement = (isLoading: boolean, isSaveMode: boolean) => {
    if (isLoading || isSaveMode) {
      setShowWorkingStatus(true);
    } else {
      setTimeout(() => {
        setShowWorkingStatus(false);
      }, 2000);
    }
  };

  const pingFunction = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, jsonBody);
    } catch (error) {
      setIsPingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const storeData = async () => {
    setIsSaveMode(true);
    try {
      const reference = ref(database, currentDate);
      const res = await set(reference, { exerciseList });
    } catch (error) {
      setIsStoreDataError(true);
    } finally {
      setIsSaveMode(false);
    }
  };

  const saveHandler = () => {
    storeData();
    pingFunction();
  };

  // Add exercise in add modal
  const addExerciseHandler = (exerciseTitle: string) => {
    if (exerciseTitle != "") {
      setExerciseList((currentList) => [
        ...currentList,
        { id: Math.random().toString(), value: exerciseTitle },
      ]);
    }
    setIsAddMode(false);
  };

  // Remove exercise in add modal
  const removeExerciseHandler = (exerciseId: string) => {
    setExerciseList((currentList) => {
      return currentList.filter((exercise) => exercise.id !== exerciseId);
    });
  };

  // Cancel addition in add modal
  const cancelExerciseAdditionHandler = () => {
    setIsAddMode(false);
  };

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
        title={showWorkingStatus ? "saving..." : "save"}
        disabled={showWorkingStatus}
        onPress={saveHandler}
      />
      <LoadingModal
        visible={showWorkingStatus}
        isLoading={isLoading}
        isError={hasError}
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
