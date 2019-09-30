const mongoose = require('mongoose');
const connect = require('../connect');

const Schema = mongoose.Schema;

const meituanDB = connect.openDB();

// mongoose.connect('mongodb://jiabin:123456@localhost:27017/meituan')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true, // 唯一
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = meituanDB.model('User', UserSchema)
