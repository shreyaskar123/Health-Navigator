import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import CustomButton from '../../components/CustomButton/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import Logo from "../../../assets/health-navigator-logo-removebg-preview.png"
export default function AlgoSummary({ navigation, route }) {
    var { id1, id2, id3, langScore1, langScore2, langScore3, distScore1, distScore2, distScore3, specialist, langSpoken } = route.params;
    const [providerInfo, setProviderInfo] = useState('')
    const id_collec = { id1, id2, id3 }
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
            .then((json) => setProviderInfo(json))
            .catch((error) => console.error(error))
    }, []);
    console.log(id1)
    console.log(id2)
    console.log(id3)
    console.log(langScore1)
    console.log(langScore2)
    console.log(langScore3)
    console.log(distScore1)
    console.log(distScore2)
    console.log(distScore3)
    var randVar = '40';
    langScore1 = parseInt(langScore1.valueOf())
    distScore1 = Number.parseFloat(distScore1).toFixed(3)
    distScore2 = Number.parseFloat(distScore2).toFixed(3)
    distScore3 = Number.parseFloat(distScore3).toFixed(3)
    console.log(typeof randVar)
    console.log(typeof langScore1)
    const CONTENT = {
        tableHead: ['Provider Name', 'Language Score *', 'Distance Score **', 'Exp'],
        tableTitle: [providerInfo.FName1, providerInfo.FName2, providerInfo.FName3],
        tableData: [
            [langScore1, distScore1, providerInfo.Exp1],
            [langScore2, distScore2, providerInfo.Exp2],
            [langScore3, distScore3, providerInfo.Exp3],
        ],
    };
    console.log(providerInfo.FName1)
    const { height } = useWindowDimensions();
    const [data, setData] = useState([]);
    const onSignInPressed = () => {
        navigation.navigate("Map", { id1: id_collec.id1, id2: id_collec.id2, id3: id_collec.id3 })
    }
    async function fetchData() { // POST request to server 
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPacket)
        }
        var output = await fetch('http://192.168.1.128:3000/', options)
    }
    useEffect(() => {  // Update CONTENTS when the data is fetched 

    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: 0.3 * height }]}
                    resizeMode="contain"
                />
                <Text style={styles.textTitle}> Your Report is Ready! </Text>

                <Text style={[styles.left, { color: '#FF007F' }]}> Your Languages: {langSpoken} </Text>
                <Text style={[styles.left, { color: '#FF007F' }]}> Desired Specialist: {specialist}</Text>


                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row
                        data={CONTENT.tableHead}
                        flexArr={[1, 2, 1, 1]}
                        style={styles.head}
                        textStyle={styles.text}
                    />
                    <TableWrapper style={styles.wrapper}>
                        <Col
                            data={CONTENT.tableTitle}
                            style={styles.title}
                            heightArr={[28, 28]}
                            textStyle={styles.text}
                        />
                        <Rows
                            data={CONTENT.tableData}
                            flexArr={[2, 1, 1]}
                            style={styles.row}
                            textStyle={styles.text}
                        />
                    </TableWrapper>
                </Table>
                <Text style={[styles.left, { fontSize: 14 }]}> * A measure of your language compatability with the provider </Text>
                <Text style={[styles.left, { fontSize: 14 }]}> ** A measure of your distance compatability with the provider</Text>
                <View style={styles.center}>
                    <CustomButton
                        onPress={onSignInPressed}
                        text="See Map"
                        style={styles.buttonStyle}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', padding: 16, paddingTop: -150, backgroundColor: '#fff',
    },
    head: { height: 40, backgroundColor: 'orange' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#2ecc71' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    textTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        paddingTop: -100
    },
    center: {
        alignItems: 'center'
    },
    left: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF2D00',
        margin: 1,
        textAlign: 'left',
        paddingTop: 20,
        paddingBottom: 15
    },
    buttonStyle: {
        left: 20,
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center',
        padding: 20
    },
    logo: {
        // width: 280, // change to percent value
        // maxHeight: 220,
        position: "relative",
        marginTop: -70,
        bottom: -38,
        height: 200,
        right: 120,
        // backgroundColor: 'orange', 
        // resizeMode: 'contain',
        //alignSelf: 'center',
        tintColor: 'red',
    },
    root: {

    }

});