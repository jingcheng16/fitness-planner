import React from 'react';
import { TextInput, StyleSheet, TextStyle, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';


type Props = {
    placeholder: string;
    style: TextStyle;
    onChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    value: string;
}

const Input: React.FC<Props> = ({ placeholder, style, onChangeText, value }: Props) => {
    return <TextInput {...placeholder} {...onChangeText} {...value} autoCapitalize='sentences' autoCorrect={true} style={{ ...styles.input, ...style }} />
};

const styles = StyleSheet.create({
    input: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
        textAlign: 'center',
    },
});

export default Input;