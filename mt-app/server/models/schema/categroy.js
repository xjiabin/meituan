const mongoose = require('mongoose');
const connect = require('../connect');
const meituanDB = connect.openDB();

const categroySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    value: {
        type: Array,
        required: true
    }
});

module.exports = meituanDB.model('categroy', categroySchema);
