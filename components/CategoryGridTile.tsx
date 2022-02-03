import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type Props = {
    onSelect: () => void;
    title: string;
}

const CategoryGridTile: React.FC<Props> = ({ onSelect, title }) => {
    return (
        <TouchableOpacity style={styles.gridItem}
            onPress={onSelect}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 90,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        //fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'right',
        color: "tomato",
    }
});

export default CategoryGridTile;