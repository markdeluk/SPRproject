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


fs.readFile('./img/bike2.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    var Base64=base64_encode(data);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      id=000
      name="test"
      model="testmodel"
      coordinates="0.000;0.000"
      dimension="20x20x20"
      wheel=20
      damage="text"
      ownerID=000
      city="horsens"
      var sql = "INSERT INTO bikesinfo (ID, name,img_src, model, coordinates, dimension, wheel, damage,ownerID,city) VALUES (?,?,?,?,?,?,?,?,?,?)";
        con.query(sql,[id,name,Base64,model,coordinates,dimension,wheel,damage,ownerID,city],function (err, result) {

          if (err) throw err;
          console.log("1 record inserted");
        });
      });
  })