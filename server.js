const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var sessions = require('express-session');
const res = require('express/lib/response');
const { spawn } = require('child_process');

const connection = mysql.createPool({
    host: 'localhost', // Your connection adress (localhost).
    user: '####################',     // Your database's username.
    password: '##############',      // Your database's password.
    database: 'Louiv_Asian_Healthcare_Worker',   // Your database's name.
    multipleStatements: true
});

const app = express();
app.use(express.json({ limit: '1mb' }))
app.use(sessions({
    secret: 'random',
    saveUninitialized: false,
    resave: false
}
));
const createQuery = (id) => {
    return "SELECT * FROM USER_INFO WHERE ID = " + id;
}

app.post('/signin-auth', (req, res) => {
    var enteredUsername = req.body.username
    var enteredPassword = req.body.password
    console.log(enteredUsername)
    console.log(enteredPassword)
    const authQuery = "SELECT Username, Password, ID, FName FROM USER_INFO WHERE Username = " + "\"" + enteredUsername + "\"" + " AND "
        + "Password = " + "\"" + enteredPassword + "\""
    console.log(authQuery)
    connection.query(authQuery, function (error, results, fields) {
        if (error) throw error;
        var success = null
        var user_id = results[0].ID
        var first_name = results[0].FName
        var password = results[0].Password
        var username = results[0].Username
        if (results.length === 0) {
            success = false
        }
        else if (results.length > 0) {
            success = true
        }
        else {
            console.log("weird")
            console.log(results)
        }
        res.json({
            sucAuth: success,
            username: username,
            password: password,
            userId: user_id,
            firstName: first_name
        });

    });
});
app.post('/lang-add', (req, res) => {
    var langSpoken = req.body.valueSpecialist
    console.log(langSpoken[0])
    const langAddQuery = (lang) => {
        return "INSERT INTO LANGUAGES_SPOKEN"
    }
    res.json({
        status: true
    });
});
app.post('/user-add', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var address = req.body.address
    var fullName = req.body.fullName.split(' ')
    for (let i = 0; i < fullName.length; i++) {
        if (fullName[i].trim() == '') {
            fullName.splice(i)
        }
    }
    var FName = fullName[0]
    var MName = ""
    if (fullName.length >= 3) {
        for (let i = 1; i < fullName.length - 1; i++) {
            MName += fullName[i]
        }
    }
    var LName = fullName[fullName.length - 1]
    var sex = req.body.sex
    var nat = req.body.nat
    var dob = req.body.DOB


    var userAddQuery = "INSERT INTO USER_INFO(FName, MName, LName, Sex, ONationality, Address, DOB, Username, Password) VALUES" + "\n"
        + "(" + "'" + FName + "'," + "'" + MName + "'," + "'" + LName + "'," + "'" + sex + "'," + "'" + nat + "'," + "'" + address
        + "'," + "'" + dob + "'," + "'" + username + "'," + "'" + password + "')"
    connection.query(userAddQuery, function (error, results, fields) {
        if (error) throw error;
        res.json({
            status: true
        });
    });

});
app.post('/algo-output', (req, res) => {
    var requiredService = req.body.valueSpecialist
    var patientID = req.body.patientID

    const pyProg = spawn('python', ['matching_algorithm.py', requiredService, patientID]);
    pyProg.stdout.on('data', function (data, error) {
        console.log(data)
        algData = data.toString().split(' ')
        /*
        algData[0] - algData[2] = ID 
        algData[3] - algData[5] = Lang Score 
        algData[6] - algData[8] = Dist Score 
        */
        res.json({
            id1: algData[0],
            id2: algData[1],
            id3: algData[2],
            langScore1: algData[3],
            langScore2: algData[4],
            langScore3: algData[5],
            distScore1: algData[6],
            distScore2: algData[7],
            distScore3: algData[8]
        });
    });
});

app.post('/get-language', (req, res) => {
    var id = req.body.patientID
    const langQuery = "SELECT Language_Spoken FROM LANGUAGES_SPOKEN WHERE ID = " + id
    connection.getConnection(function (err, connection) {
        connection.query(langQuery, function (error, results, fields) {
            if (error) throw error
            var langSpoken = ""
            for (let i = 0; i < results.length; i++) {
                langSpoken += results[i].Language_Spoken + ", "
            }
            langSpoken = langSpoken.substring(0, langSpoken.length - 2) // deletes the last space (1) and comma (2)
            res.json({
                langSpoken: langSpoken
            })
        });
    });
})
/*
User: Hindi (5) , English (10) 
Doctor: Hindi (6), Chinese (8), English (2) 
Social Worker 
Uber Driver
Pharmacist 
Medical Supply Store 
Lang: 10* 10 + 10 * 2 = 120
*/
app.post('/api', (req, res) => {
    var id1 = req.body.id1
    var id2 = req.body.id2
    var id3 = req.body.id3
    function expQuery(id) {
        return "SELECT Experience FROM SERVICE_PROVIDER WHERE Provider_ID = " + id
    }
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    connection.getConnection(function (err, connection) {

        var multiQuery = createQuery(id1) + ";" + createQuery(id2) + ";" + createQuery(id3) + ";" +
            expQuery(id1) + ";" + expQuery(id2) + ";" + expQuery(id3);

        connection.query(multiQuery, function (error, results, fields) {
            if (error) throw error;
            res.json({
                status: 'success',
                FName1: toTitleCase(results[0][0].FName),
                LName1: toTitleCase(results[0][0].LName),
                Address1: results[0][0].Address,
                Exp1: results[3][0].Experience,
                FName2: toTitleCase(results[1][0].FName),
                LName2: toTitleCase(results[1][0].LName),
                Address2: results[1][0].Address,
                Exp2: results[4][0].Experience,
                FName3: toTitleCase(results[2][0].FName),
                LName3: toTitleCase(results[2][0].LName),
                Address3: results[2][0].Address,
                Exp3: results[5][0].Experience
            });

        });
    });
})

app.listen(3000, () => {
    
});

