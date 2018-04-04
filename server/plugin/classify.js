let ModelClassify = require("../model/classify"),
    Msg = require("../model/msg"),
    moment = require('moment');

var classify = {
    list(req, res, next) {
        let uid = req.body.uid;
        ModelClassify.find({ uid: uid }).exec((err, doc) => {
            if (err) {
                console.log(err);
                Msg.postData(res, false, '系统错误', '');
            };
            let resJson = []
            doc.forEach((item) => {
                let temp = {};
                temp.name = item.name;
                temp.type = item.type;
                temp.aid = item._id
                resJson.push(temp);
            });
            Msg.postData(res, true, 'success', '', resJson);
        });
    },
    post(req, res, next) {
        let body = req.body;
        console.log(body);
        ModelClassify.find({ uid: body.uid }).exec((err, doc) => {
            if (err) {
                console.log(err);
                Msg.postData(res, false, '系统错误', '');
            };
            let flag = true;
            console.log('查找出来的数据 ' + flag);
            console.log(doc);
            console.log('提交的数据');
            console.log(body.list);

            doc.forEach(function(item) {
                let temp = item.name;
                body.list.forEach(function(item2) {
                    if (temp == item2.name) {
                        flag = false;
                        return;
                    }
                });
            });
            console.log('查询flag：' + flag);
            if (flag) {
                console.log('添加数据');
                ModelClassify.create(body.list, (err, doc) => {
                    if (err) {
                        console.log(err);
                        Msg.postData(res, false, '系统错误', '');
                    };
                    console.log(doc);
                    Msg.postData(res, true, 'success', '');
                });
            } else {
                console.log('错误数据');
                Msg.postData(res, false, '分类重复', '');
            }
        });

    }
};

module.exports.classify = classify;