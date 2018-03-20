var express = require('express'),
    routes = express.Router(),
    utils = require('../utils/common'),
    PluginUser = require("../plugin/user");

utils.log('user');

routes.post('/login', PluginUser.login.post);
routes.post('/register', PluginUser.reg.post);

module.exports = routes;