import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions
} from 'react-native'
// import { ScrollView } from "react-native-gesture-handler";
import Logo from "../../../assets/health-navigator-logo-removebg-preview.png"
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/Custominput";
// import create from "prossmpt-sync";

const SigninScreen = ({ navigation }) => {
    const { height } = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPasword] = useState('');
    const [lang, setLang] = useState('');
    const [signInPressed, setSignInPressed] = useState(false);
    const [patientID, setPatientID] = useState(-1)
    const [firstName, setFirstName] = useState('');
    const [valid, setValid] = useState(null);
    useEffect(() => {
        userAuthentication()
    }, [signInPressed]);
    useEffect(() => {
        if (signInPressed && patientID != -1 && firstName != '' && lang != '') {
            if (valid) {
                setValid(false)
                setSignInPressed(false)
                navigation.navigate("UserSelection", { patientID: patientID, fName: firstName, languageSpoken: lang });
                setFirstName('')
                setPatientID(-1)
                setUsername('')
                setPasword('')
            }
            else {
                alert("Incorrect credentials. Please try again.")
            }
        }
    }, [valid, firstName, patientID, lang]);

    async function userAuthentication() {
        console.log("in user auth")
        console.log(username)
        console.log(password)
        console.log(signInPressed)
        if (signInPressed) {
            console.log("inside func")
            const credentials = { username, password }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }
            console.log("inside func 2")

            const response = await fetch('http://192.168.1.128:3000/signin-auth', options)
            console.log("inside func 3")

            const json = await response.json()
            console.log("suc auth = " + json.sucAuth)
            setValid(json.sucAuth)
            setFirstName(json.firstName)
            setPatientID(json.userId)

        }
    }

    async function getLang() {
        console.log(patientID)
        if (patientID != -1) {
            const langInputPacket = { patientID }
            const langOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(langInputPacket)
            }
            const language = await fetch('http://192.168.1.128:3000/get-language', langOptions)
            const languageJson = await language.json()
            setLang(languageJson.langSpoken)
        }
    }
    useEffect(() => {
        getLang()
    }, [patientID])

    const onSignInPressed = () => {
        setSignInPressed(true)
        // navigation.navigate("UserSelection");
    }

    const onSignInGoogle = () => {
        console.warn("Sign In With Google");
    }

    const onSignInFacebook = () => {
        console.warn("Sign In Facebook");
    }

    const onSignInApple = () => {
        console.warn("Sign In Apple");
    }
    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.logo, { height: 0.3 * height }]}
            // resizeMode = "contain" 
            />
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPasword}
                secureTextEntry={true}
            />
            <CustomButton
                onPress={onSignInPressed}
                text="Sign In"
            />

            <CustomButton
                onPress={onSignInPressed}
                text="Forgot Password"
                type="TERTIARY"
            />
            <CustomButton
                text="Sign In With Google"
                onPress={onSignInGoogle}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"

            />

            <CustomButton
                onPress={onSignInFacebook}
                text="Sign In With Facebook"
                bgColor="#FAE9EA"
                fgColor="#DD4D44"

            />
            <CustomButton
                onPress={onSignInApple}
                text="Sign In With Apple"
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
            <CustomButton
                onPress={onSignInPressed}
                text="Don't Have an account? Create One Here!"
                type="TERTIARY"
            />
            {/*

            */}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'flex-start',
        left: 20
        // padding: 20,
        // flex: 1
    },
    logo: {
        width: 280, // change to percent value
        maxHeight: 200,
        maxWidth: 300,
        alignItems: 'center',
        left: 34,
        // backgroundColor: 'orange', 
        tintColor: 'red'
    }
});

export default SigninScreen;
//            <Image source = {Logo} style = {styles.Logo} />