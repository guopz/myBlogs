var express = require('express'),
    routes = express.Router(),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    utils = require('../utils/common');

// utils.log('user');

routes.post('/login', function(req, res, next) {

    console.log(req.headers);
    console.log(req.body);
    // fs.writeFile('input.txt', '我是新写入的内容', function(err) {
    //     if (err) console.error(err);
    //     console.log('数据写入的数据');
    //     console.log('-------------------');
    // });
    res.json({ 1: 'success' });
});
routes.post('/register', function(req, res) {
    res.json(req.body);
});

module.exports = routes;