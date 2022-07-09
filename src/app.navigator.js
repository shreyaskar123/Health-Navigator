import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from "./screens/SignInScreen";
import SelectionScreen from './screens/SelectionScreen';
import MapScreen from './screens/MapScreen';
import InsuranceSelection from './screens/InsuranceSelection';
import UserSelection from './screens/UserSelection';
import SignUpScreen from './screens/SignUpScreen';
import AlgoSummary from './screens/AlgoSummary';
/*
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import UserSelection from "./src/screens/UserSelection";
import SelectionScreen from "./src/screens/SelectionScreen";
import InsuranceSelection from "./src/screens/InsuranceSelection";
import MapScreen from "./src/screens/MapScreen";
*/
const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator headerMode="none" initialRouteName="Signup">
            <Screen name="Signup" component={SignUpScreen}></Screen>
            <Screen name="Login" component={SignInScreen}></Screen>
            <Screen name="UserSelection" component={UserSelection}></Screen>
            <Screen name="InsuranceSelection" component={InsuranceSelection}></Screen>
            <Screen name="AlgoSummary" component={AlgoSummary}></Screen>
            <Screen name="Map" component={MapScreen}></Screen>
            <Screen name="Selection" component={SelectionScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator; 