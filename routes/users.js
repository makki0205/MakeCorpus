var express 	= require('express');
var router 		= express.Router();
var	mongoose 	= require('mongoose');
var usersDB 	= require('../models/usersManagemen.js');
mongoose.connect('mongodb://localhost/hogehoge');

/* GET users listing. */
router.get("/add",function(req,res){
	res.render('add',{status:"add"});
});
router.post("/add",function(req,res){
	console.log("post is /add");
	var user = new usersDB();
	user.name = req.body.name;
	user.password = req.body.password;
	user.save(function(err){
		if(err) {
			res.json({ message: err });
		}
		else {
			res.json({ message: "User add!" });
		}
	});
});
router.get("/login",function(req,res){
	res.render("add",{status:"login"});
});

router.post("/login",function(req,res){
	var name = req.body.name;
	var password = req.body.password;
	usersDB.findOne({name: name,password: password},function(err,user){
		if (err) res.json({ message: err });
		if(user){
			res.json({ massage:null ,id: name,password: password});
			console.log("reder file");
		}else{
			res.json({ message: "ログインできませんでした。" });
		}
	});
})
module.exports = router;
