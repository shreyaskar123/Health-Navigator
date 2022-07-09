import React, { useEffect, useRef, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions
} from 'react-native'
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Logo from "../../../assets/health-navigator-logo-removebg-preview.png"
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/Custominput";
// import CustomDropdown from "../../components/CustomDropdown";
// import create from "prossmpt-sync";
// import AppNavigator from "../../app.navigator";

const SignUpScreen = ({ navigation }) => {
    DropDownPicker.setMode("BADGE");
    DropDownPicker.setListMode("SCROLLVIEW");

    const { height } = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPasword] = useState('');
    const [fullName, setFullName] = useState('');
    const [profLevels, setProfLevels] = useState([]);
    const [sex, setSex] = useState('');
    const [nat, setNat] = useState('');
    const [DOB, setDOB] = useState('');
    const [openSpecialist, setOpenSpecialist] = useState(false);
    const [dropdownClosed, setDropdownClosed] = useState(false)
    const [valueSpecialist, setValueSpecialist] = useState([]);
    const [itemsSpecialist, setItemsSpecialist] = useState([
        { label: 'Chinese', value: 'Chinese' },
        { label: 'Japanese', value: 'Japanese' },
        { label: 'Korean', value: 'Korean' },
        { label: 'Thai', value: 'Thai' },
        { label: 'Vietnamese', value: 'Vietnamese' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Urdu', value: 'Urdu' },
        { label: 'Bengali', value: 'Bengali' },
        { label: 'Persian', value: 'Persian' },
        { label: 'Arabic', value: 'Arabic' },
        { label: 'English', value: 'English' },
        { label: 'French', value: 'French' },
    ]);
    var count = 0;

    /*

    useEffect((input) => {
        setProfLevels([...profLevels, input]);
        console.log(profLevels)
    }, [count])
    */
    const onSignInPressed = async () => {
        const credentials = { username, password, address, fullName, sex, nat, DOB }
        const langAdd = { valueSpecialist }
        const userAddOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
        const langAddOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(langAdd)
        }
        const respUserAdd = await fetch('http://192.168.1.128:3000/user-add', userAddOptions)
        const respLangAdd = await fetch('http://192.168.1.128:3000/lang-add', langAddOptions)
        navigation.navigate("Login")
    }
    const onAlreadyHaveAccount = () => {
        console.log("inside")
        navigation.navigate("Login")
    }
    useEffect(() => {
        setProfLevels(...profLevels, [])
    }, [count])
    const addProfBox = () => {
        const views = [];
        var array = useRef([])
        var $Hi$
        for (let i = 0; i < valueSpecialist.length; i++) {
            count++
           // console.log(count)
            console.log("Val" + profLevels[i]);
            views.push(
                <CustomInput
                    placeholder={"Enter Proficiency Level For " + valueSpecialist[i]}
                    value={array[i]}
                    setValue={setProfLevels}
                />
            );
        }
        console.log("the val is" + array[0])
        return views;
    }

    const onSignInGoogle = () => {
        console.warn("Sign In With Google");
    }
    const onDropownClose = () => {
        setDropdownClosed(true)
    }
    const onDropdownOpen = () => {
        setDropdownClosed(false)
    }

    const onSignInFacebook = () => {
        console.warn("Sign In Facebook");
    }

    const onSignInApple = () => {
        console.warn("Sign In Apple");
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}> Welcome to Health Navigator!</Text>
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                // buttonWidth = "40%"
                // leftPosition = {-110}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPasword}
                    secureTextEntry={true}
                // buttonWidth =  "40%"
                />
                <CustomInput
                    placeholder="Address"
                    value={address}
                    setValue={setAddress}
                // buttonWidth =  "40%"
                />
                <CustomInput
                    placeholder="Full Name"
                    value={fullName}
                    setValue={setFullName}
                // buttonWidth =  "40%"
                />
                <CustomInput
                    placeholder="Sex"
                    value={sex}
                    setValue={setSex}
                // buttonWidth =  "40%"
                />
                <CustomInput
                    placeholder="Original Nationality"
                    value={nat}
                    setValue={setNat}
                // buttonWidth =  "40%"
                />
                <CustomInput
                    placeholder="Data of Birth"
                    value={DOB}
                    setValue={setDOB}
                // buttonWidth =  "40%"
                />
                <DropDownPicker
                    open={openSpecialist}
                    placeholder={"Languages Spoken"}
                    value={valueSpecialist}
                    items={itemsSpecialist}
                    setOpen={setOpenSpecialist}
                    setValue={setValueSpecialist}
                    setItems={setItemsSpecialist}
                    multiple={true}
                    searchable={true}
                    onClose={onDropownClose}
                    onOpen={onDropdownOpen}
                />
                {onDropownClose ? addProfBox() : null}

                <CustomButton
                    onPress={onSignInPressed}
                    text="Sign Up"
                />

                <CustomButton
                    onPress={onAlreadyHaveAccount}
                    text="Already have an account? Sign in Here!"
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
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

export default SignUpScreen;
//            <Image source = {Logo} style = {styles.Logo} />
