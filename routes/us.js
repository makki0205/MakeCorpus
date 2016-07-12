var express = require('express');
var router = express.Router();
// ローカル require
var request = require("request");
var fs = require("fs");


/*
* get corpus.txt
*/
router.get("/corpus.txt",function(req,res){
	res.sendfile(__dirname+"/corpuses/uscorpus.txt")
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('us');
});
/*
* 書き出し
*/
router.post("/getfile",function(req,res){
	var arrayStr = req.body.data;
	arrayStr = arrayStr.split(",");
	for(var i = 0, len = arrayStr.length; i < len; i++){
		fs.appendFile('routes/corpuses/uscorpus.txt', arrayStr[i]+"\n",'utf8', function (err) {
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
		  url: 'http://dev.unibo.info:7071/api/language/chat',
		  method: 'POST',
		  headers: headers,
		  json: true,
		  form:'{"words":"'+input+'", "language":"EN"}'
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
