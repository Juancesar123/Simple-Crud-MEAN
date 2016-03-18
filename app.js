var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('allmahasiswa',["allmahasiswa"]);
var bodyParser=require("body-parser");
app.use(bodyParser.json())
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(express.static(__dirname + '/public'));
var MongoClient = require('mongodb').MongoClient;

app.get("/ambildata",function(req,res){
	db.allmahasiswa.find(function(err,docs){
	  console.log(docs);
	  res.json(docs);
  });
});
app.post("/tambahmahasiswa",function(req,res){
	db.allmahasiswa.insert(req.body,function(err,docs){
		res.json(docs);
		
	})
	console.log(req.body);
});
app.delete("/hapusmahasiswa:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.allmahasiswa.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
})
app.put("/editdata:id",function(req,res){
	var id = req.params.id;
db.allmahasiswa.findAndModify({query:{_id:mongojs.ObjectId(id)},
update:{$set:{nama:req.body.nama,npm:req.body.npm,kelas:req.body.kelas}},new:true},function(err,doc){
res.json(doc);
});
});
app.listen(3000);