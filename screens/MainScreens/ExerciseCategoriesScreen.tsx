import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, ListRenderItem } from "react-native";

import Category from "../../models/Category";
import { CATEGORIES } from "../../data/dummy-data";
import CategoryGridTile from "../../components/CategoryGridTile";
import ExerciseListScreen from "../ExerciseListScreen";
import base_url from "../../data/base_url";

import axios from "axios";

type RootStackParamList = {
  Home: undefined;
  List: { categoryId: number };
  //List: { categoryId: string };
};

type Props = StackScreenProps<RootStackParamList, "Home" | "List">;

const Stack = createStackNavigator<RootStackParamList>();

const CategoriesScreen = ({ route, navigation }: Props) => {
  const [exerciseCategory, setExerciseCategory] = useState([]);
  const renderGridItem: ListRenderItem<Category> = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.name}
        onSelect={() => {
          navigation.navigate("List", { categoryId: itemData.item.id });
        }}
      />
    );
  };

  //   const renderGridItem: ListRenderItem<Category> = (itemData) => {
  //     return (
  //       <CategoryGridTile
  //         title={itemData.item.title}
  //         onSelect={() => {
  //           navigation.navigate("List", { categoryId: itemData.item.id });
  //         }}
  //       />
  //     );
  //   };

  const initialize = async () => {
    try {
      const data = await axios.get(`${base_url}/exercisecategory`);
      console.log(data.data.results);
      setExerciseCategory(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <FlatList
      data={exerciseCategory}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );

  //   return (
  //     <FlatList<Category>
  //       data={CATEGORIES}
  //       renderItem={renderGridItem}
  //       numColumns={2}
  //     />
  //   );
};

export default function ExerciseCategoriesScreen() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Home"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="List" component={ExerciseListScreen} />
    </Stack.Navigator>
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
