const axios = require('axios');

const api = axios.create({
    baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
    timeout: 10000,
    headers: {

    }
});

module.exports = api;
