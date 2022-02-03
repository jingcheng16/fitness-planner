import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, ListRenderItem } from 'react-native';

import Category from '../../models/Category';
import { CATEGORIES } from '../../data/dummy-data';
import CategoryGridTile from '../../components/CategoryGridTile';
import ExerciseListScreen from '../ExerciseListScreen';

type RootStackParamList = {
    Home: undefined;
    List: { categoryId: string };
}

type Props = StackScreenProps<RootStackParamList, 'Home' | 'List'>;

const Stack = createStackNavigator<RootStackParamList>();

const CategoriesScreen = ({ route, navigation }: Props) => {
    const renderGridItem: ListRenderItem<Category> = (itemData) => {
        return (
            <CategoryGridTile title={itemData.item.title}
                onSelect={() => { navigation.navigate('List', { categoryId: itemData.item.id }) }} />
        )
    }


    return (
        <FlatList<Category>
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2} />
    )
};

export default function ExerciseCategoriesScreen() {
    return (
        <Stack.Navigator screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Home"
                component={CategoriesScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name="List"
                component={ExerciseListScreen} />
        </Stack.Navigator>
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