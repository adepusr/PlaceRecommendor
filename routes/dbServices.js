var express = require('express');
var router = express.Router();
var db = require('../db.js')

router.get('/getList', function(req, res, next) {
	var  collection = db.get().collection('list');
	  collection.find({
		}).toArray(function(err, users) {
			if (err) {
				res.send(sprintf('Error when trying to fetch <br>Error message %s',err));
			} else {
				res.send(data);
			}
		})
})

router.get('/favStatus', (req, res, next)=>{	
	  var  collection = db.get().collection('list');
	var placeID= req.query.placeID;
	
	  collection.find({
		  'placeID': placeID
		}).toArray((err, users)=> {
			if (err) {
				res.send(sprintf('Error when trying to fetch <br>Error message %s',err));
			} else {
				if(users.length > 0)
				res.send(users[0]);
				else{	
					var t={}
					t.favorite= false;
					res.send(t)
				}
			}
		})
})

router.post('/updatePlace', function(req, res, next) {
	console.log(req.body)
	var placeID= req.body.placeID;
	var fav= req.body.fav ==='false'? false: true;
	var  collection = db.get().collection('list');
	  
	collection.update({
		  'placeID': placeID
	}, {
		$set: {
			  'placeID': placeID,
			  'favorite': fav
		}
	},{		  
		  'upsert': true
	  }, (err, result) => {
		if (err) {
			console.log(err)
		}
		console.log("Done");
		res.send("OK");
	});
})



module.exports = router;