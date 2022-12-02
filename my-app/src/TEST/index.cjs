var express = require('express');
var app = express();
const session = require('express-session');
const path = require('path');
const router = express.Router();
//initialization
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

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
    response.sendFile(path.join(__dirname+'/home.html'));
});


app.get('/home', function(request, response) {
    //response.render('pages/home');
    res.sendFile(path.join(__dirname+'/home.html'));
});