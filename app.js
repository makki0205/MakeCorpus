const request = require("request"),
			express = require("express"),
			bodyParser = require('body-parser'),
			app = express(),
			fs = require('fs');
var talk = -1;
var talks = [];

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
app.get ("/admin",function(req,res) {
	for (var i = 0; i <= talk; i++) {
		for (var j = 0; j < talks[i].num; j++) {
			// console.log("IN");
			// console.log(talks[i][String(j)]);
			var s = talks[i][String(j)]+"\n"
			fs.appendFile('corpus.txt', s,'utf8', function (err) {
				if(err) throw err;
			});
		}
	}
	// res.send("ファイルの書き込みが完了しました");
	res.sendfile(__dirname+"/corpus.txt")
});
app.get("/",function(req,res) {
	talk++;
	talks[talk]={};
	talks[talk]["num"]=0;
	res.render("hello",{no:talk});
});
app.post("/test:no",function(req,res) {
	if (req.body.cure != ""){
		console.log("Cure is ",req.body.cure);
		talks[req.params.no].num--;
		talks[req.params.no][talks[req.params.no].num]=req.body.cure;
		talks[req.params.no].num++;
	}
	talks[req.params.no][talks[req.params.no].num]=req.body.name;
	talks[req.params.no].num++;
	var options = {
	  url: 'http://dev.unibo.info:9000/elck0003.php',
	  method: 'POST',
	  headers: { 'Content-Type':'application/json' },
	  json: true,
	  form: {"q": req.body.name}
	}

	request(options, function (error, response, body) {
		talks[req.params.no][talks[req.params.no].num]=cut(body);
		res.render("test",{hoho:cut(body),no:req.params.no});
		talks[req.params.no].num++;
		console.log("talks is ",talks);
	});
	res.redirect("/");
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

app.listen(4000,function(){
	console.log("app starting...");
});
