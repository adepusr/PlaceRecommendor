var express = require('express');
var router = express.Router();

var db = require('../db.js')


var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC6-bmIO1HkFkHPEXhVYobcwpPjLa4M_ig'
});

router.get('/restaurantsNearme', function(req, res, next) {
	var latitude= req.query.latitude
	var longitude= req.query.longitude
	var radius= Number(req.query.radius)
	googleMapsClient.places({
      query: '',
      language: 'en',
      location: [latitude, longitude],
      radius: radius,
      minprice: 1,
      maxprice: 4,
      opennow: true,
      type: 'restaurant'
    }, function(err, data){	
		if(err){
			res.send(err);
		}else{			
			res.send(data.json)
		}
	})
});

router.get('/placeDetails', function(req, res, next) {
	var placeID= req.query.placeID	
	googleMapsClient.place({
		placeid: placeID
	}, function(err, data){
		if(err){
			res.send(err);
		}else{			
			res.send(data.json.result)
		}
	})
});

module.exports = router;


