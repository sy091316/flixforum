const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bycrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    user: 'admin',
    host: 'flixforum-db.cdwyjlv3wddo.us-west-2.rds.amazonaws.com',
    password: 'FlixForum',
    port: '3306',
    database: 'LoginSystem',
});

app.post("/register", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const hashedPassword = await bycrypt.hash(req.body.password, 10);

        db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
        [username, email, hashedPassword], 
        (err, result) => {
            if(err) {
                console.log(err);
            }
            res.status(201).send(result);
        });
    } catch {
        res.status(500).send();
    }
    
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, result) => {
            if(err) {
                res.send({err:err});
            }
            if (result.length > 0) {
                if(bycrypt.compare(password, result[0].password)){
                    res.send(result);
                } else {
                    res.send({message: "Wrong username/password combination!"});
                }
            } else {
                res.send({message: "No such username."});
            }
        });
        
        /*
        db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?', 
        [email, password], 
        (err, result) => {
            if(err) {
                res.send({err:err});
            } 

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Wrong username/password combination!"});
            }
        });
        */
    } catch {
        res.status(500).send();
    }
});

app.listen(3001, () => {
    console.log("running server");
})