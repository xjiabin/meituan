const mongoose = require('mongoose');
const connect = require('../connect');
const meituanDB = connect.openDB();

const provinceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    child: {
        type: Array,
        required: true
    }
});

module.exports = meituanDB.model('province', provinceSchema);
