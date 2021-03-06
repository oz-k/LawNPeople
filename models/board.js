const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const board = new Schema({
    boardNo:Number,
    title:{type:String, required:true},
    contents:{type:String},
    writer:{type:Number, required:true}
});

autoIncrement.initialize(mongoose.connection);

board.plugin(autoIncrement.plugin, {
    model:'board',
    field:'boardNo',
    startAt:1,
    increment:1
});

module.exports = mongoose.model('board', board, 'board');