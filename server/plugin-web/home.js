let ModelArticle = require("../model/article"),
    ModelClassify = require("../model/classify"),
    Msg = require("../model/msg"),
    moment = require('moment');

var home = {
    get(req, res, next) {
        let getParams = req.body,
            pageJson = {
                status: true,
                msg: 'success'
            };
            
        ModelArticle.find().count().exec((err, count) => {
            if (err) {
                Msg.postData(res, false, '系统错误', '');
            };
            // console.log(count);
            // Find 参数
            getParams.page_count = getParams.page_count ? getParams.page_count : 8;
            getParams.cur_count = getParams.cur_count ? getParams.cur_count : 1;

            let param1 = {},
                param2 = { title: 1, updateTime: 1, author: 1, digest:1, classify:1 },
                editData = function (_doc, _temp) { 
                    _doc.forEach((item) => {
                        let itemObj = {};
                        itemObj.date = moment(item.updateTime).format('YYYY-MM-DD');
                        itemObj.address = item.title;
                        itemObj.name = item.author;
                        itemObj._id = item._id;
                        itemObj.digest = item.digest;
                        itemObj.classify = item.classify;
                        _temp.push(itemObj);
                    });
                    return _temp;
                };
                
            if (getParams.cur_count > 1) {
                
                let getCount = (getParams.cur_count - 1) * getParams.page_count;

                ModelArticle.find(param1, param2).skip(getCount).limit(getParams.page_count).sort("-updateTime").exec((err, doc) => {
                    if (err) {
                        Msg.postData(res, false, '系统错误', '');
                    };
                    
                    let newDate = [];
                    
                    editData(doc, newDate);

                    pageJson.data = {
                        list: newDate,
                        count: count,
                        page_count: getParams.page_count
                    }
                    res.json(pageJson);
                });

            } else {
                
                ModelArticle.find(param1, param2).limit(getParams.page_count).sort("-updateTime").exec((err, doc) => {
                    if (err) {
                        Msg.postData(res, false, '系统错误', '');
                    };
                    
                    let newDate = [];

                    editData(doc, newDate);
                    
                    pageJson.data = {
                        list: newDate,
                        count: count,
                        page_count: getParams.page_count
                    }
                    res.json(pageJson);
                });
            }

        });
        // end
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

var categorie = {
    get(req, res, next) {
        console.log('classify');
        ModelClassify.find().exec((err, doc) => {
            if (err) {
                console.log(err);
                Msg.postData(res, false, 'error');
            };
            let postData = [];
            // doc.forEach((item) => {
                
            // });
            Msg.postData(res, true, 'success', '', doc);
        });
    }
};

module.exports.home = home;
module.exports.categorie = categorie;