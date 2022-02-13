import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

type Props = {
    visible: boolean;
    isLoading: boolean;
    onCancel: () => void;
}

const LoadingModal = ({ visible, isLoading, onCancel }: Props) => {

    const loadingIndicator = (isLoading: boolean) => {
        if (isLoading) {
            return <Text>Loading...</Text>
        } else {
            return <Text>Success</Text>
        }
    }

    return (
        <Modal visible={visible} animationType="slide">
            <TouchableWithoutFeedback onPress={() => { onCancel() }}>
                <View style={styles.modalContainer}>

                    <View style={styles.indicatorContainer}>
                        {loadingIndicator(isLoading)}
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '40%'
    },

});

export default LoadingModal;