const request = require("request"),
			express = require("express"),
			bodyParser = require('body-parser'),
			app = express();

/*
*	settings
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views",__dirname+'/views');
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

/*
*		router
*/
app.get("/",function(req,res) {
	res.render("hello");
});
app.post("/test",function(req,res) {
	console.log(req.param("name"));

	var headers = {
  	'Content-Type':'application/json'
	}

	var options = {
	  url: 'http://dev.unibo.info:9000/elck0003.php',
	  method: 'POST',
	  headers: headers,
	  json: true,
	  form: {"q": req.param("name")}
	}

	request(options, function (error, response, body) {
		res.render("test",{hoho: cut(body)});
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
