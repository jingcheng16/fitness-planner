import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default function PreferencesScreen() {
    return (
        <View style={styles.container}>
            <Text>Open up PreferencesScreen.tsx to start working on your app!</Text>
        </View>
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