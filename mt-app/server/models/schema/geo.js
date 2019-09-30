const mongoose = require('mongoose');
const connect = require('../connect');

const meituanDB = connect.openDB();

const menuSchema = new mongoose.Schema({
    menu: {
        type: Array,
        required: true
    }
});

module.exports = {
    menu: meituanDB.model('menus', menuSchema),
};
