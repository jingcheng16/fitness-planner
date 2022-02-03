import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';

import StackButton from '../../components/StackButton';

import ChangePasswordScreen from '../MeScreen/ChangePasswordScreen';
import EmailAddressScreen from '../MeScreen/EmailAddressScreen';
import FeedbackScreen from '../MeScreen/FeedbackScreen';
import MyProfileScreen from '../MeScreen/MyProfileScreen';
import PreferencesScreen from '../MeScreen/PreferencesScreen';

type RootStackParamList = {
    Home: undefined;
    Email: undefined;
    Password: undefined;
    Preferences: undefined;
    BodyMeasurements: undefined;
    Feedback: undefined;
}

type Props = StackScreenProps<RootStackParamList, 'Home' | 'Email' | 'Password' | 'Preferences' | 'BodyMeasurements' | 'Feedback'>;

const RootStack = createStackNavigator<RootStackParamList>();


const HomeScreen = ({ route, navigation }: Props) => {


    return (
        <View>
            <View style={{ paddingVertical: 10 }}>
                <StackButton onPress={() => { navigation.navigate('Email') }}>Email Address</StackButton>
                <StackButton onPress={() => { navigation.navigate('Password') }}>Change Password</StackButton>
                <StackButton onPress={() => { navigation.navigate('Preferences') }}>Preferences</StackButton>
                <StackButton onPress={() => { navigation.navigate('BodyMeasurements') }}>Body Measurements</StackButton>
                <StackButton onPress={() => { navigation.navigate('Feedback') }}>Feedback</StackButton>
            </View>
            <View style={{ paddingVertical: 10 }}>
                <StackButton>Log Out</StackButton>
            </View>

        </View>
    )
}

export default function MeScreen() {
    return (
        // <View style={styles.container}>
        //     <Text>Open up MeScreen.tsx to start working on your app!</Text>
        // </View>
        <RootStack.Navigator initialRouteName="Home">
            <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Email" component={EmailAddressScreen} />
            <RootStack.Screen name="Password" component={ChangePasswordScreen} />
            <RootStack.Screen name="Preferences" component={PreferencesScreen} />
            <RootStack.Screen name="BodyMeasurements" component={MyProfileScreen} />
            <RootStack.Screen name="Feedback" component={FeedbackScreen} />
        </RootStack.Navigator>
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