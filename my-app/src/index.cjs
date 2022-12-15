var express = require('express');
var app = express();
var bodyParser = require("body-parser"); 
const session = require('express-session');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io-client");
const socket = io("http://LAPTOP-7M6U6UFG:4000", {
    withCredentials: true
    }, {secure: true});
const path = require('path');
const router = express.Router();
//initialization
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//credentials of the user
let username;
let password;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false,limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}))


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true,limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
//GET and POST request to handle redirect and rendering
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/login.html'));
});
app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});

app.post('/auth', function(request, response) {
    //response.render('pages/home');
    var username = request.body.username;
	var password = request.body.password;
    console.log('login '+ username + password);
    socket.emit('checkLogin',{username:username,password:password});
    //console.log(__dirname)
    socket.on('LoginResult',function(msg){
        console.log(msg);
        response.redirect('/home');
    });
    response.redirect('/home');
});
app.post('/registerUser', function(request, response) {
    //response.render('pages/home');
    var username = request.body.username;
	var password = request.body.password;
    console.log("DATA RECEIVED FROM HTML" + username + password);
    socket.emit('insertUser',{username:username,password:password});
    //console.log(__dirname)
    socket.on('insertUserResult',function(msg){
        console.log(msg);
        response.redirect('/home');
    });
});


app.get('/home', function(request, response) {
    //response.render('pages/home');
    response.sendFile(path.join(__dirname+'/mainpage.html'));
});
app.get('/PrivacyPolicy', function(request, response) {
    //response.render('pages/home');
    response.sendFile(path.join(__dirname+'/PrivacyPolicy.html'));
});
app.get('/TermOfService', function(request, response) {
    //response.render('pages/home');
    response.sendFile(path.join(__dirname+'/TermOfService.html'));
});
app.post('/home', function(request, response) {
    //response.render('pages/home');
    response.sendFile(path.join(__dirname+'/mainpage.html'));
});
app.post('/reserve', function(request, response) {
    console.log("Info from more detail:")
    var bikeName = request.body['bikeName']
    var bikeDescription = request.body['bikeDescription']
    var bikeAddress = request.body['bikeAddress']
    var bikePrice = request.body['bikePrice']
    var bikeImg = request.body['bikeImg'];
    let BID = request.body['BID'];
    let reservationAmount = request.body['reservationAmount'];
    //request to the server Price data
    socket.emit('getPrices',BID);
    console.log(bikeName);
    socket.on('PricesResult',function(msg){
        console.log(msg);
        let costDay = msg[0]['costDay'];
        let costWeek = msg[0]['costWeek'];
        let costMonth = msg[0]['costMonth'];
        let tax = msg[0]['taxesPercentage'];
        console.log("PRICES",costDay,costWeek,costMonth,tax);
        response.render("reservationPage",{BID:BID,bikename:bikeName,bikedescription:bikeDescription,bikeaddress:bikeAddress,bikeprice:bikePrice,bikeimg:bikeImg,costDay:costDay,costMonth:costMonth,costWeek:costWeek,tax:tax,reservationAmount:reservationAmount});
    })
    //res.sendFile(path.join(__dirname+'/book.html'));
});

app.post('/book', function(request, response) {
    console.log("Info from more detail:")
    var bikeName = request.body['bikeName']
    var bikeDescription = request.body['bikeDescription']
    var bikeAddress = request.body['bikeAddress']
    var bikePrice = request.body['bikePrice']
    var bikeImg = request.body['bikeImg'];
    let BID = request.body['BID'];
    let reservationAmount = request.body['reservationAmount'];
    //request to the server Price data
    socket.emit('getPrices',BID);
    console.log(bikeName);
    socket.on('PricesResult',function(msg){
        console.log(msg);
        let costDay = msg[0]['costDay'];
        let costWeek = msg[0]['costWeek'];
        let costMonth = msg[0]['costMonth'];
        let tax = msg[0]['taxesPercentage'];
        console.log("PRICES",costDay,costWeek,costMonth,tax);
        response.render("bookPage",{bikename:bikeName,bikedescription:bikeDescription,bikeaddress:bikeAddress,bikeprice:bikePrice,bikeimg:bikeImg,costDay:costDay,costMonth:costMonth,costWeek:costWeek,tax:tax,reservationAmount:reservationAmount});
    })
    //res.sendFile(path.join(__dirname+'/book.html'));
});

app.post('/Paypal', function(request, response) {
    console.log("Redirecting to PayPal")
    var TotalAmount = request.body['TotalAmount'];
    var Currency = request.body['Currency'];
    response.render("PayPal",{totalamount:TotalAmount,currency:Currency});
});
app.post('/Visa', function(request, response) {
    var TotalAmount = request.body['TotalAmount'];
    var Currency = request.body['Currency'];
    response.render("Visa",{totalamount:TotalAmount,currency:Currency});
});
app.post('/GooglePay', function(request, response) {
    var TotalAmount = request.body['TotalAmount'];
    var Currency = request.body['Currency'];
    response.render("GooglePay",{totalamount:TotalAmount,currency:Currency});
});
app.post('/MasterCard', function(request, response) {
    var TotalAmount = request.body['TotalAmount'];
    var Currency = request.body['Currency'];
    response.render("MasterCard",{totalamount:TotalAmount,currency:Currency});
});
app.post('/ApplePay', function(request, response) {
    var TotalAmount = request.body['TotalAmount'];
    var Currency = request.body['Currency'];
    response.render("ApplePay",{totalamount:TotalAmount,currency:Currency});
});
app.post('/MobilePay', function(request, response) {
    var TotalAmount = request.body['TotalAmount'];
    var Currency = request.body['Currency'];
    response.render("MobilePay",{totalamount:TotalAmount,currency:Currency});
});

app.post('/LockPage', function (request, response){
    response.sendFile(path.join(__dirname+'/LockPage.html'));
});
app.post('/CaptureImage', function (request, response){
    response.sendFile(path.join(__dirname+'/CaptureImage.html'));
});
app.post('/PhotoCapture', function (request, response){
    response.sendFile(path.join(__dirname+'/photoCapture.html'));
});
app.post('/Renting', function(request, response) {
    //response.render('pages/home');
    response.sendFile(path.join(__dirname+'/renting.html'));
});
app.post('/ShowDamageAfter', function (request, response){
    response.sendFile(path.join(__dirname+'/ShowDamageAfter.html'));
});
app.post('/LendPage', function (request, response){
    response.sendFile(path.join(__dirname+'/LendPage.html'));
});

app.post('/InfoPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InfoPage.html'));
});

app.post('/IntroductionLendPage', function (request, response){
    response.sendFile(path.join(__dirname+'/IntroductionLendPage.html'));
});
app.post('/InputLendPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InputLendPage.html'));
});
app.post('/InputLockPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InputLockPage.html'));
});
app.post('/InsertBikePicPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InsertBikePicPage.html'));
});
app.post('/SummaryPage', function (request, response){
    response.sendFile(path.join(__dirname+'/SummaryPage.html'));
});

//TEST
app.get('/PhotoCapture', function (request, response){
    response.sendFile(path.join(__dirname+'/photoCapture.html'));
});

app.get('/CaptureImage', function (request, response){
    response.sendFile(path.join(__dirname+'/CaptureImage.html'));
});
app.get('/Renting', function(request, response) {
    ///TODO: connect variables
    //response.render('pages/home');
    var username = "";
    var password = "";
    var bikename = "";
    var address = "";
    var orderID = "";
    response.render("Renting",{username:username,password:password,bikename:bikename,address:address,orderID:orderID});
    
});
app.get('/ShowDamageAfter', function (request, response){
    response.sendFile(path.join(__dirname+'/ShowDamageAfter.html'));
});
app.get('/LendPage', function (request, response){
    response.sendFile(path.join(__dirname+'/LendPage.html'));
});

app.get('/InfoPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InfoPage.html'));
});
app.get('/IntroductionLendPage', function (request, response){
    response.sendFile(path.join(__dirname+'/IntroductionLendPage.html'));
});
app.get('/InputLendPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InputLendPage.html'));
});
app.get('/InputLockPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InputLockPage.html'));
});
app.get('/InsertBikePicPage', function (request, response){
    response.sendFile(path.join(__dirname+'/InsertBikePicPage.html'));
});
app.get('/SummaryPage', function (request, response){
    response.sendFile(path.join(__dirname+'/SummaryPage.html'));
});




