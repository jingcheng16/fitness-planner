import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';

import { CATEGORIES, EXERCISES } from '../data/dummy-data';
import ExerciseItem from '../components/ExerciseItem';
import Category from '../models/Category';
import Exercise from '../models/Exercise';
import { ListRenderItem } from 'react-native';

type RootStackParamList = {
    Home: undefined;
    List: { categoryId: string };
}
type Props = StackScreenProps<RootStackParamList, 'List'>;

const ExerciseListScreen = ({ route, navigation }: Props) => {
    const catId = route.params.categoryId;
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    if (selectedCategory === undefined) {
        throw new TypeError('The category was promised to always be there!');
    }
    const displayedExercise = EXERCISES.filter(exercise => exercise.categoryIds.indexOf(catId) >= 0)

    const renderExerciseItem: ListRenderItem<Exercise> = itemData => {
        return <ExerciseItem title={itemData.item.title} onSelectExercise={() => { }} />;
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedCategory.title,
            headerStyle: { backgroundColor: "white", }
        });
    }, [navigation, selectedCategory]);

    return (

        <View style={styles.screen}>
            <FlatList data={displayedExercise}
                keyExtractor={(item, index) => item.id}
                renderItem={renderExerciseItem}
                style={{ width: '95%', }}
                contentContainerStyle={{ alignItems: 'stretch' }} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ExerciseListScreen;