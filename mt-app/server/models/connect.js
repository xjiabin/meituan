const mongoose = require('mongoose')
const dbConfig = require('../config')

const openDB = (dbname = 'meituan') => {
    let db = mongoose.createConnection(
        `mongodb://${dbConfig.dbs.user}:${dbConfig.dbs.password}@${dbConfig.dbs.host}:${dbConfig.dbs.port}/${dbname}?authSource=${dbConfig.dbs.db}`,
        { useNewUrlParser: true }
    );

    db.on('connected', () => {
        console.log(`Mongoose connected on: mongodb://${dbConfig.dbs.host}:${dbConfig.dbs.port}/${dbname}`);
    });

    db.on('error', err => {
        mongoose.connection.close(); // 关闭数据库
        console.error(`MongoDB connection file: ${err}`);
    });

    db.on('disconnected', () => {
        console.log('MongoDB connection disconnected');
    });

    return db;
}

module.exports = { openDB };
