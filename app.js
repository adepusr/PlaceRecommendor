var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var mongo = require('mongodb');
var Handlebars = require('handlebars');
var serverCfg = require('./serverCfg.json');
var db = require('./db.js')
var fs = require('fs');
var fse = require('fs-extra');


//handlebar helper for comparision
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});


// Init App
var app = express();


// Mongo connection check
connection = function(){
  db.connect(serverCfg.mongocon, function(err) {
    if (err) {
      console.log(err)  
      conState = "close" 
      setTimeout(connection,5000)
    } else {
      console.log('Connected to mongodb')
      conState = "alive" 
    }
  })
  }
connection();

var routes = require('./routes/api');
var googleAPI = require('./routes/googleAPI');
var dbServices = require('./routes/dbServices');
//app.use('/', routes);
//app.use('/users', users);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/googleAPI', googleAPI);
app.use('/dbServices', dbServices);

app.listen(3000);

console.log('RESTful API server started on: 3000');
