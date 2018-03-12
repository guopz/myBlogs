var express = require('express'),
    app = express(),
    path = require('path'),
    silly = require('silly-datetime'),
    bodyParser = require('body-parser');
// luyou
var index = require('./routes/index'),
    user = require('./routes/user');
// 解析post参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// liyou 2
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

app.use('/index', index);
app.use('/user', user);
app.use(express.static(path.join(__dirname, '../website/')));

app.post('/name', function(req, res, next) {
    console.log(req.body);
    res.json(req.body);
    next();
})
var port = 3030;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    // console.log(server.address());
    console.log('Example app listening at http://%s:%s', host, port);
});