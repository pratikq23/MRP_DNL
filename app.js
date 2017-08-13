
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load user route
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev')); 
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'mysql5017.smarterasp.net',
        user: 'a2945c_mrp',
        password : 'root@123',
        port : 3306, //port mysql
        database:'db_a2945c_mrp'
    },'pool') //or single

);

// user api  
var userObj = require('./routes/user'); 
app.post('/user', userObj.getUserList);
app.post('/user/update', userObj.updateUser);
app.post('/user/add', userObj.save);
app.post('/user/delete', userObj.deleteUser);
app.post('/user/getById',userObj.getUserById);


//login api
var loginObj = require('./routes/login');
app.post('/login',loginObj.loginUser);

//role api's
var roleObj = require('./routes/role');
app.get('/getRole',roleObj.getRole);

//company js
var companyObj = require('./routes/company');
app.get('/getcompany' ,companyObj.getComapny);
app.post('/addcompany' ,companyObj.addcompany);
app.post('/deletecompany' ,companyObj.deleteCompany);
app.post('/updatecompany' ,companyObj.updatecompany);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
