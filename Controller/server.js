const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cinepelicula"
})

app.get("/generos", (req, res) => {
    const sql = "SELECT * FROM generos";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(3307, () => {
    console.log("Listening...");
})

