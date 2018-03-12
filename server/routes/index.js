var express = require('express'),
    routes = express.Router(),
    utils = require('../utils/common');

// utils.log('index');

routes.get('/', function(req, res) {
    res.json({ 0: 'success' });
});

module.exports = routes;