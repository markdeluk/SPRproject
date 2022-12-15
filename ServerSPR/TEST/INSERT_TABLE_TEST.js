const http = require('http');
//const Blob= require('Blob');
//var Blob = require('blob');
var express = require('express'); 
const app = express();
var fs = require('fs');
const server = http.createServer(app);
//const { Server } = require("socket.io");
//const io = new Server(server);
var mysql = require('mysql');
var con = mysql.createConnection({
host: "10.21.11.214",
user: "marco",
password: "marcolino2002",
database: "spr"
});

function base64_encode(file) {
  return new Buffer(file).toString('base64');
}

fs.readFile('C:/Users/matti/OneDrive/Documenti/GitHub/SPRproject/my-app/src/static/css/imgs/bike.jpeg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    var Base64=base64_encode(data);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      let type = 0;
      let BID = 1;
      
      var sql = "INSERT INTO Image (type,BID,bytearray) VALUES (?,?,?)";
        con.query(sql,[type,BID,Base64],function (err, result) {

          if (err) throw err;
          console.log("1 record inserted");
        });
      });
  })


  ///insert bike
  /*
fs.readFile('C:/Users/matti/OneDrive/Documenti/GitHub/SPRproject/my-app/src/static/css/imgs/bike.jpeg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    var Base64=base64_encode(data);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      let BID = 1;
      let ownerUID = 1;
      let name = 'My second bike';
      let type = 'Sport Bike';
      let notes = 'astonishing bike';
      let model = 'Turbo';
      let size = 'S';
      let wheels = '18';
      let initialPosID = 1; //VIA UNIVERSITY COLLEGE
      let status = 1;
      let IsDamaged = 1;//not damaged
      let lastUsage;
      let lastPosID = 1; //kamtjatka residence
      let lockingCode = 1234;
      let city = 'horsens';
      var sql = "INSERT INTO bike (BID,ownerUID,name,type,notes,model,size,wheels,initialPosID,status,IsDamaged,lastPosID,lockingCode,city) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        con.query(sql,[BID,ownerUID,name,type,notes,model,size,wheels,initialPosID,status,IsDamaged,lastPosID,lockingCode,city],function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
  })

  */