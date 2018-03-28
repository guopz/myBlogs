var express = require('express'),
    routes = express.Router(),
    utils = require('../utils/common'),
    PluginArticle = require("../plugin/article");

utils.log('list');

routes.post('/article', PluginArticle.article.post);
routes.post('/show', PluginArticle.show.post);
routes.post('/del', PluginArticle.del.post);
routes.post('/delall', PluginArticle.del.all);

routes.get('/edit', PluginArticle.updata.get);
// routes.post('/updata', PluginArticle.updata.post);

module.exports = routes;