import React from "react";
import { Component, useState } from "react-native"
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
// <AppNavigator/> 
import CustomButton from "../../components/CustomButton/CustomButton";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions,
    FlatList
} from 'react-native'
const UserSelection = ({ navigation, route }) => {
    //const firstName = navigation.getParam('fName')
    const firstName = route.params.fName;
    const userID = route.params.patientID
    const langSpoken = route.params.languageSpoken
    const onInsurance = () => {
        navigation.navigate("InsuranceSelection");

    }
    const onPatient = () => {
        navigation.navigate("Selection", { patID: userID, langSpoken: langSpoken });
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}> Welcome {firstName} !</Text>

            <Text style={styles.title}> </Text>
            <View style={styles.pad}>

            </View>
            <CustomButton
                text="Patient"
                onPress={onPatient}
                bgColor="#FAE9EA"
                fgColor="#000000"
            />
            <View style={styles.button}>

            </View>
            <CustomButton
                text="Insurance Provider"
                onPress={onInsurance}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />


        </View>
    )

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    button: {
        padding: 50,
        position: "relative",
    },
    pad: {
        padding: 80
    },
    logo: {
        width: 280, // change to percent value
        maxHeight: 200,
        maxWidth: 300,
        // backgroundColor: 'orange', 
        tintColor: 'red'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
});

export default UserSelection; 
