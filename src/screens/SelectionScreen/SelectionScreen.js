import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions,
    ActivityIndicator
} from 'react-native'
// import { ScrollView } from "react-native-gesture-handler";
import Logo from "../../../assets/health-navigator-logo-removebg-preview.png"
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/Custominput";
import DropDownPicker from "react-native-dropdown-picker";
// import create from "prossmpt-sync";

const SelectionScreen = ({ navigation, route }) => {
    DropDownPicker.setMode("BADGE");

    const { height } = useWindowDimensions();
    const patientID = route.params.patID
    const langSpoken = route.params.langSpoken
    const [address, setAddress] = useState('');
    const [language, setLanguage] = useState('');
    const [insurance, setInsurance] = useState('');
    const [provPressed, setProvPressed] = useState(false);
    const [algLoading, setAlgLoading] = useState(true);
    const [algID, setAlgID] = useState([]);
    const [inNextScreen, setinNextScreen] = useState(false);

    const [openInsurance, setOpenInsurance] = useState(false);
    const [valueInsurance, setValueInsurance] = useState(null);
    const [itemsInsurance, setItemsInsurance] = useState([
        { label: 'Humana', value: 'Humana' },
        { label: 'United Healthcare', value: 'United Healthcare' },
        { label: 'AETNA', value: 'AETNA' },
        { label: 'Blue Cross Blue Shield', value: 'Blue Cross Blue Shield' },
        { label: 'Kaiser Permanente', value: 'Kaiser Permanente' }
    ]);
    const [openSpecialist, setOpenSpecialist] = useState(false);
    const [valueSpecialist, setValueSpecialist] = useState(null);
    const [itemsSpecialist, setItemsSpecialist] = useState([
        { label: 'Neurology', value: 'Neurology' },
        { label: 'Family Specialist', value: 'Family Specialist' },
        { label: 'Ophthalmology', value: 'Ophthalmology' },
        { label: 'Oncology', value: 'Oncology' },
        { label: 'Insurance Consultant', value: 'Insurance' },
        { label: 'Social Worker', value: 'Social' },
        { label: 'Uber Driver', value: 'Uber' },
        { label: 'Medical Supply Store', value: 'MSS' },
        { label: 'Pharmacist', value: 'Pharmacist' }
    ]);

    const dataPacket = { valueSpecialist, patientID }
    useEffect(() => {
        fetchData()
    }, [provPressed]);

    async function fetchData() {
        if (provPressed) {
            console.log(valueSpecialist)
            console.log(dataPacket)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataPacket)
            }
            const response = await fetch('http://192.168.1.128:3000/algo-output', options)
            const json = await response.json()
            setAlgID(json)
            setAlgLoading(false)
            // navigation.navigate("Map", { id1: algID.id1, id2: algID.id2, id3: algID.id3 })
            // setProvPressed(false)
        }
    }
    useEffect(() => {
        if (provPressed) {
            setProvPressed(false)
            navigation.navigate("AlgoSummary", {
                id1: algID.id1,
                id2: algID.id2,
                id3: algID.id3,
                langScore1: algID.langScore1,
                langScore2: algID.langScore2,
                langScore3: algID.langScore3,
                distScore1: algID.distScore1,
                distScore2: algID.distScore2,
                distScore3: algID.distScore3,
                specialist: valueSpecialist,
                langSpoken: langSpoken
            })
            setAlgID([])
            setAlgLoading(true)
        }
    }, [algID]); 1

    /*
            await fetch('http://192.168.1.128:3000/api', options)
            .then((res) => res.json())
            .then((json) =>
                setData(json),
                setFetchRequestLoading(false))
            .catch((error) => console.error(error))
    */
    async function onProviderPressed() {
        setProvPressed(true);
        console.log("ProviderPressed")
        if (!algLoading) {
            console.log(algID);
            // navigation.navigate("Map", { id1: arr[0], id2: arr[1], id3: arr[2] })
        }

        // console.warn("On Provider Pressed");
        // navigation.navigate("Map", { id1: arr[0], id2: arr[1], id3: arr[2] })
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
    let idReturn = () => {
        /*
        This function uses user information entered in this screen to return an array 
        consisting of the ids of the three best fit doctors as determined by the 
        algorithm 
        */
        return [1, 2, 3]
    }
    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.logo, { height: 0.3 * height }]}
            />
            <View style={styles.root1}>
                <Text style={styles.title}> Matching Information</Text>
                <Text style={[styles.left]}> Address </Text>
                <CustomInput
                    placeholder=""
                    value={address}
                    setValue={setAddress}
                />
                <Text style={[styles.left]}> Language </Text>
                <CustomInput
                    placeholder=""
                    value={language}
                    setValue={setLanguage}
                />
                <Text style={[styles.left]}> Insurance Provider </Text>
                <DropDownPicker
                    open={openInsurance}
                    value={valueInsurance}
                    items={itemsInsurance}
                    setOpen={setOpenInsurance}
                    setValue={setValueInsurance}
                    setItems={setItemsInsurance}
                    zIndex={3000}
                    zIndexInverse={1000}

                />
                <Text style={[styles.left]}> Service Speciality </Text>
                <DropDownPicker
                    open={openSpecialist}
                    value={valueSpecialist}
                    items={itemsSpecialist}
                    setOpen={setOpenSpecialist}
                    setValue={setValueSpecialist}
                    setItems={setItemsSpecialist}
                    zIndex={2000}
                    zIndexInverse={2000}
                    searchable={true}
                />
                <View style={styles.center}>
                    <CustomButton
                        style={[styles.move]}
                        onPress={onProviderPressed}
                        text="Provider Matching"
                    />
                </View> 
                {algLoading && provPressed ? <ActivityIndicator style={styles.ActivityIndicator} size="large" /> : null}

            </View>
        </View>
    );
}
// {[ styles.CircleShapeView, { backgroundColor: "#fff" } ]} 
const styles = StyleSheet.create({
    root: {
        padding: 15,
    },
    root1: {
        padding: 15,
        margin: -15,
        position: 'relative',
        bottom: 90
    },
    center: {
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    move: {
        left: 50,
        alignContent: 'center',
        justifyContent: 'center'
    },
    left: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF2D00',
        margin: 1,
        textAlign: 'left',
    },
    logo: {
        width: 280, // change to percent value
        maxHeight: 200,
        maxWidth: 300,
        position: "relative",
        bottom: 50,
        right: -45,
        // backgroundColor: 'orange', 
        // resizeMode: 'contain',
        //alignSelf: 'center',
        tintColor: 'red'
    },
    ActivityIndicator: {
        justifyContent: 'center',
        padding: 30
    }
});

export default SelectionScreen;
//            <Image source = {Logo} style = {styles.Logo} />
