import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';

type Props = {
    id: string;
    title: string;
    onDelete: (ExerciseId: string) => void;
}

const WorkoutItem: React.FC<Props> = ({ id, title, onDelete }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onDelete.bind(this, id)}>
            <View style={styles.listItem}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10,
        borderColor: 'grey',
        borderWidth: 1,
    },
})

export default WorkoutItem;