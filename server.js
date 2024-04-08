const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(cors());
/****************connecting to  mysql************************* */
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CHIDERA001?.1",
    database: "vehicle_management",
    port: "3306",
});
// endpoint for adding a vehicle 
app.post("/vehicles", bodyParser.json(), function (req, res) {
    const { make, model, year, color, VIN, licensePlateNumber, odometerReading } = req.body;
    const sql = `INSERT INTO vehicles (make, model, year, color, VIN ,licensePlateNumber,odometerReading) VALUES (?,?,?,?,?,?,?)`;
    con.query(sql, [make, model, year, color, VIN, licensePlateNumber, odometerReading], function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});
// endpoint for getting all vehicle added 
app.get("/vehicles", bodyParser.json(), function (req, res) {
    const sql = `SELECT * FROM vehicles`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});
// creating an endpoint for updating a vehicle added 
app.put("/vehicles/:id", bodyParser.json(), function (req, res) {
    const vehicles_id = req.params.id;
    const { make, model, year, color,VIN ,licensePlateNumber,odometerReading } = req.body;
    const sql = `UPDATE vehicles SET make=?, model=?, year=?, color=?, VIN=? ,licensePlateNumber=?,odometerReading=? WHERE id=?`;
    con.query(sql, [make, model, year, color,VIN ,licensePlateNumber,odometerReading, vehicles_id], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
// creating an endpoint for deleting vehicle 
app.delete("/vehicles/:id", function (req, res) {
    const vehicle_id = req.params.id;
    const sql = `DELETE FROM vehicles WHERE id=?`;
    con.query(sql, [vehicle_id], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
app.listen(1000),
    console.log("your server is runnunig at port 1000");