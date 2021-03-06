const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const user = new Schema({
    id:{type:String, unique:true, required:true},
    pw:{type:String, required:true},
    name:{type: String, required: true},
    email:{type:String, required:true},
    age:{type:Number, required:true}
});

//required:true == NULL이 아니여야 함
//unique:true == 유일해야 함
//uppercase:true == 대문자로
//lowercase:true == 소문자로
//trim:true == 공백제거
//default:data == 기본값 지정
//min:0 == 최솟값
//max:100 == 최댓값
//index:true == 인덱싱

module.exports = mongoose.model('user', user, 'user');