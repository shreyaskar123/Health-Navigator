import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions,
    Dimensions
} from 'react-native'
import MapView, { Callout, Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import AppLoader from "../../components/AppLoader/AppLoader";
import { DevSettings } from 'react-native';

// import bodyParser from "body-parser";
// import { ScrollView } from "react-native-gesture-handler";
// import Logo from "../../../assets/health-navigator-logo-removebg-preview.png"
// import CustomButton from "../../components/CustomButton/CustomButton";
// import CustomInput from "../../components/CustomInput";
const MapScreen = ({ route }) => {
    var commet;
    const { id1, id2, id3 } = route.params;
    const id_collec = { id1, id2, id3 };
    const [data, setData] = useState([]);
    // console.log("Start")
    // console.log(typeof data.Address1 === typeof commet)
    // console.log("End")
    const [FetchRequestLoading, setFetchRequestLoading] = useState(true);

    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [isLoading3, setLoading3] = useState(true);

    const [location1, setLocation1] = useState([]);
    const [location2, setLocation2] = useState([]);
    const [location3, setLocation3] = useState([]);
    const [location4, setLocation4] = useState([]);

    Geocoder.init("#################################################################", { language: "en" });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id_collec)
    };

    useEffect(async () => {
        await fetch('http://192.168.1.128:3000/api', options)
            .then((res) => res.json())
            .then((json) =>
                setData(json),
                setFetchRequestLoading(false))
            .catch((error) => console.error(error))
    }, []);


    useEffect(() => {
        if (FetchRequestLoading) {
            return;
        }
        else {
            Geocoder.from(data.Address1)
                .then((json) => setLocation1(json.results[0].geometry.location))
                .catch(error => console.warn(error))
                .finally(() => setLoading1(false));
        }

    }, [data.Address1]);

    useEffect(() => {
        if (FetchRequestLoading) {
            return;
        }
        else {
            Geocoder.from(data.Address2)
                .then((json) => setLocation2(json.results[0].geometry.location))
                .catch(error => console.warn(error))
                .finally(() => setLoading2(false));
        }

    }, [data.Address2]);

    useEffect(() => {
        if (FetchRequestLoading) {
            return;
        }
        else {
            Geocoder.from(data.Address3)
                .then((json) => setLocation3(json.results[0].geometry.location))
                .catch(error => console.warn(error))
                .finally(() => setLoading3(false));
        }

    }, [data.Address3]);

    if (!isLoading1 && !isLoading2 && !isLoading3) {
        console.log(location1)
        console.log(location2)
        console.log(location3)
    }

    /*
        data.FName1 = ""
        data.LName1 = ""
        data.Address1 = ""
        data.FName2 = ""
        data.LName2 = ""
        data.Address2 = ""
        data.FName3 = ""
        data.LName3 = ""
        data.Address3 = ""
    */



    // console.log(location3.lat)


    // Just call reload method 
    const [mapRegion, setmapRegion] = useState({
        latitude: 38.2527,
        longitude: -85.7585,
        latitudeDelta: 0.922,
        longitudeDelta: 0.421,
    });

    return (
        <>
            <View>
                {(isLoading1 || isLoading2 || isLoading3) ?
                    <MapView
                        style={styles.map}
                        region={mapRegion}
                    >
                    </MapView>
                    : (
                        <MapView
                            style={styles.map}
                            region={mapRegion}
                            showsUserLocation={true}
                        >

                            <Marker
                                coordinate={{
                                    latitude: location1.lat, //location1.lat 38.315430,
                                    longitude: location1.lng // location1.lng
                                }}
                                pinColor="black"
                            >
                                <View style={styles.callout}>
                                    <Callout>
                                        <Text> Doctor: {data.FName1} {data.LName1}, Exp: {data.Exp1}</Text>
                                        <Text> Address: {data.Address1} </Text>
                                    </Callout>
                                </View>
                            </Marker>
                            {/* 
            initialRegion={{
                latitude: 38.2527,
                longitude: -85.7585,
                latitudeDelta: 0.922,
                longitudeDelta: 0.421
            }}
        >
           */}
                            <Marker
                                coordinate={{
                                    latitude: location2.lat,//38.315340, //location2.lat,
                                    longitude: location2.lng // location2.lng
                                }}
                                pinColor="black"
                            >
                                <View style={styles.callout}>
                                    <Callout>
                                        <Text> Doctor: {data.FName2} {data.LName2}, Exp: {data.Exp2}</Text>
                                        <Text> Address: {data.Address2} </Text>
                                    </Callout>
                                </View>
                            </Marker>

                            <Marker
                                coordinate={{
                                    latitude: location3.lat, //location3.lat,
                                    longitude: location3.lng // location3.lng
                                }}
                                pinColor="black"
                            >
                                <View style={styles.callout}>
                                    <Callout>
                                        <Text> Doctor: {data.FName3} {data.LName3}, Exp: {data.Exp3}</Text>
                                        <Text> Address: {data.Address3}</Text>
                                    </Callout>
                                </View>
                            </Marker>

                            <Marker
                                coordinate={{
                                    latitude: location2.lat,
                                    longitude: location2.lng
                                }}
                                pinColor="black"
                            >
                                <View style={styles.callout}>
                                    <Callout>
                                        <Text> Doctor: {data.FName2} {data.LName2}, Exp: {data.Exp2}</Text>
                                        <Text> Address: {data.Address2} </Text>
                                    </Callout>
                                </View>
                            </Marker>

                        </MapView>)}
            </View>
        </>
        //<View style={styles.root}>

        // </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 0,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    callout: {
        width: 500,
        height: 500
    },
    popup: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: "#fff",
        borderRadius: 6,
        borderColor: "#ccc",
        borderWidth: 0.5,
        padding: 0,
        width: 300,
        height: 300,
    },
    name: {
        fontSize: 15,
        // marginBottom: 5, 
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default MapScreen; 
