import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,

    },
    input: {},
})
export default CustomInput;
/*
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions
} from 'react-native'
import { TextInput } from "react-native-gesture-handler";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.conatiner}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                // style = {styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {

    }
});
export default CustomInput;
*/