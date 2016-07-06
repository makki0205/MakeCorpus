const request = require("request"),
			express = require("express"),
			bodyParser = require('body-parser'),
			app = express(),
			ECT = require('ect'),
    	ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }),
			fs = require('fs');

var talk = -1;
var talks = [];

/*
*	settings
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views",__dirname+'/views');
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);
app.use(express.static(__dirname + '/public'));

/*
*		router
*/
app.get("/corpus.txt",function(req,res){
	res.sendfile(__dirname+"/corpus.txt")
});
app.get("/",function(req,res) {
	res.render("index");
});
var cnt = 0;
app.post("/unib",function(req,res){
	var input = req.body.input;
	var headers = {
		'Content-Type':'application/json'
	}
	var options = {
		  url: 'http://dev.unibo.info:9000/elck0003.php',
		  method: 'POST',
		  headers: headers,
		  json: true,
		  form: {"q": input}
		}

		request(options, function (error, response, body) {
			res.json({
				text: cut(body)
			});
		});
});
app.post("/getfile",function(req,res){
	var arrayStr = req.body.data;
	arrayStr = arrayStr.split(",");
	for(var i = 0, len = arrayStr.length; i < len; i++){
		fs.appendFile('corpus.txt', arrayStr[i]+"\n",'utf8', function (err) {
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
*		cut
*		@params { string } data - response data
*		@return { string } data - formating data
*/
function cut(data){
	var min,max;
	for(max = 0;data[max]!=":"; max++){
		if(data[max] == ","){
			min = max;
		}
	}
	data = data.slice(min+1,max);
	data = data.replace(/\s+/g,"");
 	return data;
}

app.listen(3000,function(){
	console.log("app starting...");
});
