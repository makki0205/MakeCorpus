var request = require("request"),
	express = require("express"),
	bodyParser = require('body-parser'),
	app = express(),
	str="";

/*
*	settings
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views",__dirname+'/views');
app.set("view engine","ejs");
app.use(express.static(__dirname+'/public'));

app.get("/",function(req,res) {
	// var options = {
	//   url: 'http://dev.unibo.info:9000/elck0003.php',
	//   method: 'POST',
	//   headers: headers,
	//   json: true,
	//   form: {"q":req.body.name}
	// }
	// request(options, function (error, res, body) {
	// 	str=cut(body);
	// });
	res.render("hello");
});
app.post("/test",function(req,res) {
	console.log(req.param("name"));
	var options = {
	  url: 'http://dev.unibo.info:9000/elck0003.php',
	  method: 'POST',
	  headers: headers,
	  json: true,
	  form: {"q":req.param("name")}
	}
	request(options, function (error, hoge, body) {
		str=cut(body);
		res.render("test",{hoho:str});
	});
});


var headers = {
  'Content-Type':'application/json'
}


function cut(data){
 data = data.replace(/(<.+>|ユーザー��?.+」|「|��?)/g,"");
  data = data.match(/[^\x01-\x7E]/g);
  data = data.join("");
 return data;
}

app.listen(3000,function(){
	console.log("app starting...");
});
