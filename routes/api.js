var express = require('express');
var router = express.Router();
var serverCfg = require('../serverCfg');
var http = require('http');
var request = require('request');
var db = require('../db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/Restaurant')
});

router.get('/Restaurant', function(req, res, next) {
  res.render('mainPage');
});

module.exports = router;