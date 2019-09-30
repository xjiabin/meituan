const mongoose = require('mongoose');
const connect = require('../connect');
const meituanDB = connect.openDB();

const pcaSchema = new mongoose.Schema({
    code: String,
    name: String,
    cities: [{
        code: String,
        name: String,
        areas: [{
            code: String,
            name: String
        }]
    }]
});

module.exports = meituanDB.model('pca', pcaSchema);
