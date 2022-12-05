var express = require('express');
var app = express();
var bodyParser = require("body-parser"); 
const session = require('express-session');
const path = require('path');
const router = express.Router();
//initialization
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/auth', function(request, response) {
    //response.render('pages/home');
    console.log(request.body)
   // var username = request.body.username;
	//var password = request.body.password;
    console.log(__dirname)
    response.redirect('/home');
    //response.sendFile(path.join(__dirname+'/mainpage.html'));
});


app.get('/home', function(request, response) {
    //response.render('pages/home');
    response.sendFile(path.join(__dirname+'/mainpage.html'));
});


app.post('/book', function(request, response) {
    console.log("Info from more detail:")
    console.log(request.body)
    var bikeName = request.body['bikeName']
    var bikeDescription = request.body['bikeDescription']
    var bikeAddress = request.body['bikeAddress']
    var bikePrice = request.body['bikePrice']
    var bikeImg = request.body['bikeImg']
    response.render("bookPage",{bikename:bikeName,bikedescription:bikeDescription,bikeaddress:bikeAddress,bikeprice:bikePrice,bikeimg:bikeImg});
    //res.sendFile(path.join(__dirname+'/book.html'));
});

app.post('/Paypal', function(request, response) {
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