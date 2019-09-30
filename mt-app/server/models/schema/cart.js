const mongoose = require('mongoose');
const connect = require('../connect');
const meituanDB = connect.openDB();

const cartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    detail: {
        type: Array,
        required: true
    },
    cartNo: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = meituanDB.model('cart', cartSchema);
