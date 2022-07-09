// import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import 'react-native-gesture-handler';
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import UserSelection from "./src/screens/UserSelection";
import SelectionScreen from "./src/screens/SelectionScreen";
import InsuranceSelection from "./src/screens/InsuranceSelection";
import MapScreen from "./src/screens/MapScreen";
import AppNavigator from "./src/app.navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import AlgoSummary from "./src/screens/AlgoSummary";
export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message <AppNavigator/> 
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <SafeAreaView style={styles.root}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});