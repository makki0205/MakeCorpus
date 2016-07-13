var express = require('express');
var router = express.Router();
// ローカル require
var request = require("request");
var fs = require("fs");
var	mongoose 	= require('mongoose');
var usersDB 	= require('../models/usersManagemen.js');
mongoose.connect('mongodb://localhost/hogehoge');

/*
* get corpus.txt
*/
router.get("/corpus.txt",function(req,res){
	res.sendfile(__dirname+"/corpuses/corpus.txt");
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/',function(req,res){
	var name = req.body.name;
	var password = req.body.password;
	usersDB.findOne({name: name,password: password},function(err,user){
		if (err) res.json({ message: err });
		else if(user){
			res.render("index",{name:name,password:password});
		}else{
			res.json({ message: "ログインできませんでした。" });
		}
	});
})
/*
* 書き出し
*/
router.post("/getfile",function(req,res){
	var arrayStr = req.body.data;
	arrayStr = arrayStr.split(",");
	for(var i = 0, len = arrayStr.length; i < len; i++){
		fs.appendFile('routes/corpuses/corpus.txt', arrayStr[i]+"\n",'utf8', function (err) {
			if(err){
				res.json({
					message: err
				});
			};
		});
	}
	res.json({
		message: true
	});
});
/*
* post /unib /
*/
router.post("/unib",function(req,res){
	var input = req.body.input;
	var headers = {
		'Content-Type':'application/json'
	}
	var options = {
		  url: 'http://dev.unibo.info:7070/api/language/chat',
		  method: 'POST',
		  headers: headers,
		  json: true,
		  form:'{"words":"'+input+'", "language":"JA"}'
		}

		request(options, function (error, response, body) {
			res.json({
				text: cut(body["text"])
			});
		});
});

/*
*		cut
*		@params { string } data - response data
*		@return { string } data - formating data
*/
function cut(data){
	data = data.replace(/\s+/g,"");
	if(data==""){
		return "エラーです"
	}
 	return data;
}

module.exports = router;
