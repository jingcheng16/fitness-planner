import React from 'react';
import { TextInput, TextInputProps, StyleSheet, TextStyle, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';


type Props = {
    placeholderParam: string;
    styleParam: TextStyle;
    onChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    valueParam: string;
}

const Input = (props: TextInputProps) => {
    return <TextInput {...props} autoCapitalize='sentences' autoCorrect={true} style={[styles.input, props.style]} />
};
// style={{ ...styles.input, ...styleParam

const styles = StyleSheet.create({
    input: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
        textAlign: 'center',
    },
});

export default Input;