//import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import WorkoutScreen from './screens/MainScreens/WorkoutScreen';
import ExerciseCategoriesScreen from './screens/MainScreens/ExerciseCategoriesScreen';
import LogScreen from './screens/MainScreens/LogScreen';
import MeScreen from './screens/MainScreens/MeScreen';

import { NavigatorScreenParams } from '@react-navigation/native';

type MainBottomTabParamList = {
  Workout: undefined;
  Exercise: undefined;
  Log: undefined;
  Me: NavigatorScreenParams<StackParamList>;
}

type StackParamList = {
  Home: undefined;
  Email: undefined;
  Password: undefined;
  Preferences: undefined;
  BodyMeasurements: undefined;
  Feedback: undefined;
}

type Props = BottomTabScreenProps<MainBottomTabParamList, 'Workout' | 'Exercise' | 'Log' | 'Me'>;

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

function App({ route, navigation }: Props) {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: 'barbell' | 'barbell-outline' | 'clipboard' | 'clipboard-outline' | 'grid' | 'grid-outline' | 'person' | 'person-outline';

            if (route.name === 'Workout') {
              iconName = focused
                ? 'barbell'
                : 'barbell-outline';
            } else if (route.name === 'Log') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            } else if (route.name === 'Exercise') {
              iconName = focused ? 'grid' : 'grid-outline'
            } else {
              iconName = focused ? 'person' : 'person-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#f4511e', },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', },
        })}>
        <BottomTab.Screen name="Workout" component={WorkoutScreen} />
        <BottomTab.Screen name="Exercise" component={ExerciseCategoriesScreen} />
        <BottomTab.Screen name="Log" component={LogScreen} />
        <BottomTab.Screen name="Me" component={MeScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;