import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { CATEGORIES, EXERCISES } from "../data/dummy-data";
import ExerciseItem from "../components/ExerciseItem";
import Category from "../models/Category";
import Exercise from "../models/Exercise";
import { ListRenderItem } from "react-native";

import base_url from "../data/base_url";
import axios from "axios";

type RootStackParamList = {
  Home: undefined;
  List: { categoryId: number };
  //List: { categoryId: string };
};
type Props = StackScreenProps<RootStackParamList, "List">;

const ExerciseListScreen = ({ route, navigation }: Props) => {
  const catId = route.params.categoryId;
  const [displayedExercise, setDisplayedExercise] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  // const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  // if (selectedCategory === undefined) {
  //   throw new TypeError("The category was promised to always be there!");
  // }
  // const displayedExercise = EXERCISES.filter(
  //   (exercise) => exercise.categoryIds.indexOf(catId) >= 0
  // );

  const initialize = async () => {
    try {
      const data = await axios.get(`${base_url}/exercise?category=${catId}`);
      const categoryData = await axios.get(`${base_url}/exercisecategory`);
      const categories: Category[] = categoryData.data.results;
      const selectedCategory = categories.find((cat) => cat.id === catId);
      if (selectedCategory === undefined) {
        throw new TypeError("The category was promised to always be there!");
      }
      // console.log(data.data.results);
      setDisplayedExercise(data.data.results);
      setCategoryName(selectedCategory?.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const renderExerciseItem: ListRenderItem<Exercise> = (itemData) => {
    return (
      <ExerciseItem title={itemData.item.name} onSelectExercise={() => {}} />
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerStyle: { backgroundColor: "white" },
    });
  }, [navigation, categoryName]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedExercise}
        // keyExtractor={(item, index) => item.id}
        renderItem={renderExerciseItem}
        style={{ width: "95%" }}
        contentContainerStyle={{ alignItems: "stretch" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExerciseListScreen;
