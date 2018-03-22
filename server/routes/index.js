var express = require('express'),
    routes = express.Router(),
    utils = require('../utils/common'),
    PluginArticle = require("../plugin/article");

utils.log('list');

routes.post('/article', PluginArticle.article.post);
routes.post('/show', PluginArticle.show.post);

module.exports = routes;