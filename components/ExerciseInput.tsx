import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import Input from './Input';

type Props = {
    visible: boolean;
    onAddExercise: (ExerciseTitle: string) => void;
    onCancel: () => void;
}

const ExerciseInput = ({ visible, onAddExercise, onCancel }: Props) => {
    const [enteredExercise, setEnteredExercise] = useState('');

    const exerciseInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
        const value = e.nativeEvent.text;
        setEnteredExercise(value)
    }

    const addExerciseHandler = () => {
        onAddExercise(enteredExercise)
        setEnteredExercise('');
    }

    const cancelHandler = () => {
        onCancel();
        setEnteredExercise('');
    }



    return (
        <Modal visible={visible} animationType="slide">
            <TouchableWithoutFeedback onPress={
                () => { Keyboard.dismiss() }
            }>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Exercise"
                        style={styles.input}
                        onChangeText={exerciseInputHandler}
                        value={enteredExercise}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="ADD"
                                onPress={addExerciseHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="CANCEL"
                                color="red"
                                onPress={cancelHandler}
                            />
                        </View>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '40%'
    },
    button: {
        width: "60%"
    }

});

export default ExerciseInput;