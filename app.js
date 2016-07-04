var request = require("request"),
	express = require("express"),
	app = express();

/*
*	settings
*/
app.use(express.static(__dirname+'/public'));

var headers = {
  'Content-Type':'application/json'
}
var options = {
  url: 'http://dev.unibo.info:9000/elck0003.php',
  method: 'POST',
  headers: headers,
  json: true,
  form: {"q":"子犬が死んだ"}
}
// request(options, function (error, res, body) {
//   console.log(cut(body))
// });
function cut(data){
 data = data.replace(/(<.+>|ユーザー��?.+」|「|��?)/g,"");
  data = data.match(/[^\x01-\x7E]/g);
  data = data.join("");
 return data;
}
app.listen(3000,function(){
	console.log("app starting...");
});
