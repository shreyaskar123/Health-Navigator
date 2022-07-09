import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions
} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import Logo from "../../../assets/health-navigator-logo-removebg-preview.png"
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/Custominput";
import DropDownPicker from "react-native-dropdown-picker";
// import create from "prossmpt-sync";

const InsuranceSelectionScreen = ({ navigation }) => {
    const { height } = useWindowDimensions();
    const [address, setAddress] = useState('');
    const [language, setLanguage] = useState('');
    const [insurance, setInsurance] = useState('');
    const [openInsurance, setOpenInsurance] = useState(false);
    const [valueInsurance, setValueInsurance] = useState(null);
    function getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
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
        { label: 'Cardiologist', value: 'Cardiologist' },
        { label: 'Neurologist', value: 'Neurologist' },
        { label: 'Pharmacist', value: 'Pharmacist' },
        { label: 'General Doctor', value: 'General Doctor' },
        { label: 'Surgeon', value: 'Surgeon' }
    ]);
    const [openWrapService, setOpenWrapService] = useState(false);
    const [valueWrapService, setValueWrapService] = useState(null);
    const [itemsWrapService, setItemsWrapService] = useState([
        { label: 'Insurance Consultant', value: 'Insurance Consultant' },
        { label: 'Interpreter', value: 'Interpreter' },
    ]);
    const onProviderPressed = () => {
        navigation.navigate("Map", { id1: getRandomNumberBetween(1, 20), id2: getRandomNumberBetween(1, 20), id3: getRandomNumberBetween(1, 20) })
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
        // <ScrollView>
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.logo, { height: 0.3 * height }]}
            />
            <View style={styles.root1}>
                <Text style={styles.title}>Insurance Counselor</Text>
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
                <Text style={[styles.left]}> Service Speciality </Text>
                <DropDownPicker
                    open={openSpecialist}
                    value={valueSpecialist}
                    items={itemsSpecialist}
                    placeholder="Medical Specialist"
                    setOpen={setOpenSpecialist}
                    setValue={setValueSpecialist}
                    setItems={setItemsSpecialist}
                    zIndex={3000}
                    zIndexInverse={1000}
                />
                <Text style={[styles.left]}> Wraparound Service</Text>
                <DropDownPicker
                    open={openWrapService}
                    value={valueWrapService}
                    items={itemsWrapService}
                    placeholder="Dropdown"
                    setOpen={setOpenWrapService}
                    setValue={setValueWrapService}
                    setItems={setItemsWrapService}
                    zIndex={2000}
                    zIndexInverse={2000}
                />
                <CustomButton
                    onPress={onProviderPressed}
                    text="Provider Matching"
                    style={[styles.move]}

                />
            </View>
        </View>
        // </ScrollView>
    );
}
// {[ styles.CircleShapeView, { backgroundColor: "#fff" } ]} 
const styles = StyleSheet.create({
    root: {
        padding: 15,
    },
    move: {
        padding: 3000
    },
    root1: {
        padding: 15,
        margin: -15,
        position: 'relative',
        bottom: 90
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
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
    }
});

export default InsuranceSelectionScreen;
//            <Image source = {Logo} style = {styles.Logo} />
