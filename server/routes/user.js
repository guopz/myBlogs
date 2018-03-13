var express = require('express'),
    routes = express.Router(),
    utils = require('../utils/common'),
    PluginUser = require("../plugin/user");

// utils.log('user');

routes.post('/login', PluginUser.login.post);
routes.post('/register', PluginUser.reg.post);

// routes.post('/login', function(req, res, next) {
//     // success
//     console.log(req.body);
//     res.json(req.body);
// });
// routes.post('/register', function(req, res) {
//     res.json(req.body);
// });

module.exports = routes;