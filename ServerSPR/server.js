//this javascript file will act as an intermediate between the MySQL database and the client
const http = require('http');
const fs = require('fs');
/*
const options = {
  key: fs.readFileSync('agent2-key.pem'),
  cert: fs.readFileSync('agent2-cert.pem')
};
*/
var express = require('express'); 
const app = express();
const server = http.createServer(app);
var mysql = require('mysql');
//instantiate database connection
var con = mysql.createConnection({
host: "LAPTOP-7M6U6UFG",
//host: "10.21.11.214",
user: "marco",
password: "marcolino2002",
database: "spr"
});
//create socket connection
const io = require("socket.io")(server, {
    cors: {
      origin: true, //set to true can create security vulnerabilities, but allows every client to access the server
      methods: ["GET", "POST"],
      credentials: true
    }
  });


//application connected to the server
io.on('connection', (socket) => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log("connection from "+ socketId +" "+clientIp)
    socket.on('getBikes', (msg) => {
        //console.log('message: ' + msg);
        ///connect to the database and retrieve the wanted image

        con.connect(function(err){
          //SELECT all bikes from the selected city
          var sql="SELECT *FROM bikesinfo WHERE city=?";
          con.query(sql,[msg],function (err, result) {

            if (err) throw err;
            //console.log("1 record retrieved");
            //console.log(result);
            //send the result to the client
            socket.emit("sendBikesResult",result);
          });
        });
      });
  });
  
// function to encode file data to base64 encoded string
function base64_encode(file) {
  return new Buffer(file).toString('base64');
}



//server listen on this port
  server.listen(4000, () => {
    console.log('listening on *:4000');
    
    //convert image to binary data for mysql
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
          /*
        con.query(sql,[id,name,Base64,model,coordinates,dimension,wheel,damage,ownerID,city],function (err, result) {

            if (err) throw err;
            console.log("1 record inserted");
          });
*/
        });
    })
    
  });
