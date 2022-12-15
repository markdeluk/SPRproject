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
        ///connect to the database and retrieve the wanted image

        con.connect(function(err){
          //SELECT all bikes from the selected city
          var sql="SELECT  bytearray, latitude, longitude, bike.BID, ownerUID, name, bike.type, notes, model, size, wheels, initialPosID, status, isDamaged, lastUsage, lastPosID, lockingCode, city \
                    FROM bike,image,position WHERE city=? AND bike.BID = image.BID AND position.posID = bike.lastPosID";
          con.query(sql,[msg],function (err, result) {

            if (err) throw err;
            console.log("RESULTS"+ result);
            let rows = JSON.parse(JSON.stringify(result));
            
            console.log(rows);
            //send the result to the client
            socket.emit("sendBikesResult",rows);
          });
        });
      });
      socket.on('getPrices',(msg) =>{
        console.log("MSG GETPRICE" + msg);
        let date_ob = new Date();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let BID = msg;
        //result = getCurrentPrices(msg,year,month);
        con.connect(function(err){
          con.beginTransaction(function(err){
            var sql = " SELECT costDay, costWeek, costMonth, taxesPercentage\
                        FROM Cost \
                        WHERE monthNumber = ? AND year = ? AND BID = ?";
            con.query(sql,[month,year,BID],function(err,result){
              let rows = JSON.parse(JSON.stringify(result));
              console.log(rows);
              socket.emit('PricesResult',rows);
            });
          });
        });
      });
    socket.on('checkLogin',(msg) =>{
      //console.log('login '+ username + password);
      result = checkLoginCredentials(msg.username,msg.password);
      socket.emit('Result',result);
    });
    socket.on('insertUser',(msg) =>{
      //TODO: add function that enable the user to create this fields when he clicks on register
      result = InsertUser(msg.username,msg.password,"NULL","NULL","NULL");
      socket.emit('insertUserResult',result);
    });
  });
  



//server listen on this port
  server.listen(4000, () => {
    console.log('listening on *:4000');    
  });
  function InsertUser(username,password,name,surname,mail){
    let statusQuery = "SUCCESS";
    con.connect(function(err){
          //INSERT INTO CREDENTIALS LAST LOGIN
          var sql=" INSERT INTO CREDENTIALS (USERNAME,PASSWORD) VALUES (?,?);";
          con.query(sql,[username,password],function (err, result) {

            if (err) {
               statusQuery = "FAILED";
              throw err;
            }
          });
        });
        //GET NUMBER OF CURRENT USERS
        var sql = "SELECT COUNT(*) AS NUMBERUSER FROM USER";
        con.query(sql,function (err,result){
          if (err){
            statusQuery = "FAILED"
          }
          let rows = JSON.parse(JSON.stringify(result[0]));
          let numberUser = parseInt(rows['NUMBERUSER']) + 1;
           //CREATE USER INSIDE USER TABLE
          sql = "INSERT INTO USER (UID,name,surname,mail) VALUES (?,?,?,?)";
          con.query(sql,[numberUser,name,surname,mail],function (err, result) {

            if (err) {
               statusQuery = "FAILED";
              throw err;
            }
          });
          //PUT LINE INSIDE LOGIN
          sql = "INSERT INTO LOGIN (UID,USERNAME) VALUES (?,?)"
          con.query(sql,[numberUser,username],function(err,result){
            if (err) {
              statusQuery = "FAILED";
             throw err;
           }
          })

        });
    return{status:statusQuery,result:""}
  }

  function checkLoginCredentials(username,password){
    let statusQuery;
    con.connect(function(err){
      //check if user has been created
      con.beginTransaction(function(err){
      var sql="SELECT COUNT(*) AS NUMBERLOGIN FROM Credentials WHERE username = ? AND password = ?;";
      con.query(sql,[username,password],function (err, result) {

        if (err) {
          statusQuery = "FAILED";
          throw err;
        }
        let rows = JSON.parse(JSON.stringify(result[0]));
        let numberLogin = parseInt(rows['NUMBERLOGIN']);
        return{status:statusQuery,result:numberLogin};
      });
      });
    });
  }
  function getCurrentPrices(BID,year,month){
    con.connect(function(err){
      con.beginTransaction(function(err){
        var sql = " SELECT costDay, costWeek, costMonth, taxesPercentage\
                    FROM Cost \
                    WHERE monthNumber = ? AND year = ? AND BID = ?";
        con.query(sql,[month,year,BID],function(err,result){
          let rows = JSON.parse(JSON.stringify(result));
          console.log(rows);
          return rows;
        });
      });
    });
  }