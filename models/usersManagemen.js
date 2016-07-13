var mongoose 	= require('mongoose'), // mongooseを呼ぶ
    Schema		= mongoose.Schema, // mongooseのスキーマを使う
    UserSchema 	= new Schema({
    name:		{ type: String, required: true }, // nameはstring
    password: 	{ type: String, required: true } //passwordはstring
    });

module.exports = mongoose.model('User', UserSchema); // UserSchemaを外部参照できるようにする
