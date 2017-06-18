var express = require('express');
var app =  express();
var mongojs = require('mongojs');
var db = mongojs('myproject', []);
var bodyParser = require('body-parser');
//var contactList = db.collection(contactList);	

/*app.get('/', function(req,res){
   res.send("Hello World from server.js");
});
var MongoClient = require('mongodb').MongoClient;
var connectionUrl = 'mongodb://localhost:27017/myproject',
sampleCollection = 'chapters';	
var chapters = [{
'Title': 'Snow Crash',
'Author': 'Neal Stephenson'
},{
'Title': 'Snow Crash',
'Author': 'Neal Stephenson'
}];
MongoClient.connect(connectionUrl, function(err, db) {
console.log("Connected correctly to server");
// Get some collection
var collection = db.collection(sampleCollection);
collection.insert(chapters,function(error,result){
//here result will contain an array of records inserted
if(!error) {
console.log("Success :"+JSON.stringify(result)+" chapters inserted!");
} else {
console.log("Some error was encountered!");
}
db.close();
});
});*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.get('/getContactList',function(req,res){
	console.log("Hi I received a get request");
	db.contactList.find(function(err, docs){
		console.log("Received docs ", JSON.stringify(docs));
		res.json(docs);
	});



	/*var contactList = [
		{
			"name"  : "Debashis",
			"email"  : "debashis@test.com",
			"contact" : "9732092227"
		},
		{
			"name"  : "Super User",
			"email"  : "super@test.com",
			"contact" : "123456789"
		},
		{
			"name"  : "Big Boss",
			"email"  : "big@test.com",
			"contact" : "97654321"
		}
	];*/
	
});

app.post('/addContact', function(req, res){
	console.log("Adding Contact", req.body);
	db.contactList.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/removeContact/:id', function(req, res){
	var id = req.params.id;
	console.log("Deleting Contact : ", id);
	db.contactList.remove({_id : mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});
app.put('/updateContact/:id', function(req, res){
	var id = req.params.id;
	var contact = req.body; 
	console.log("updating Contact : ", id);
	console.log(req.body);
	db.contactList.findAndModify({
			query : {
				_id : mongojs.ObjectId(id)
			},
			update : {
				$set : {
					name : contact.name,
					email : contact.email,
					contact : contact.contact
				}
			},
			new : true
	}, function(err, doc){
		res.json(doc);
	})
})

app.listen(3000);
console.log("Server running in port 3000");