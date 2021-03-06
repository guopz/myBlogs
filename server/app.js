var express = require('express'),
    app = express(),
    path = require('path'),
    silly = require('silly-datetime'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

var article = require('./routes/article'),
    user = require('./routes/user');
    home = require('./routes/home');

mongoose.connect('mongodb://localhost/myblog');
app.use(session({
    secret: 'iqjmvh-178fd-fwh9f-cfenp',
    store: new MongoStore({
        url: 'mongodb://localhost/myblog'
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../website/')));

// 跨域中间件
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};

app.use(allowCrossDomain);
app.use('/list', article);
app.use('/user', user);
app.use('/home', home);

var port = 3030;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    // console.log(server.address());
    console.log('Website app listening at http://%s:%s', host, port);
});