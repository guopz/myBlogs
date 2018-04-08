var express = require('express'),
    routes = express.Router(),
    utils = require('../utils/common'),
    PluginHome = require("../plugin-web/home");

utils.log('home');

routes.get('/list', PluginHome.home.get);
routes.get('/categorie', PluginHome.categorie.get);
// routes.post('/show', PluginHome.show.post);

module.exports = routes;