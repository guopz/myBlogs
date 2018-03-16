var express = require('express'),
    app = express(),
    path = require('path'),
    silly = require('silly-datetime'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

var index = require('./routes/index'),
    user = require('./routes/user');
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
app.use(function(req, res, next) {
    var user = req.session.user;
    if (user) {
        app.locals.user = user;
    } else {
        app.locals.user = user;
    };
    // app.locals.ceshi = "测试用！"; 
    // 在前台通过 <%= ceshi%> 调用
    next();
});

// app.use('/index', index);
app.use('/user', user);
// app.post('/name', function(req, res, next) {
//     console.log(req.body);
//     res.json(req.body);
//     next();
// });

// index(express);

var port = 3030;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    // console.log(server.address());
    console.log('Example app listening at http://%s:%s', host, port);
});