let ModelArticle = require("../model/article"),
    Msg = require("../model/msg"),
    moment = require('moment');

// 添加文章
let article = {
    post: function(req, res, next) {
        let postDate = {
            title: req.body.a_title,
            source: req.body.b_source,
            author: req.body.c_author,
            dynamicTags: req.body.dynamicTags,
            content: req.body.d_desc,
            uid: req.body.uid,
        };
        if (req.body.cid) {

            ModelArticle.updateOne({ _id: req.body.cid }, { $set: postDate }, (err, doc) => {
                if (err) {
                    console.log(err);
                    Msg.postData(res, false, '系统错误', '');
                };
                Msg.postData(res, true, 'success', '/articlelist');
            });

        } else {

            ModelArticle.findOne({ title: postDate.title }, function(err, data) {

                if (err) {
                    console.log(err);
                    Msg.postData(res, false, '系统错误', '');
                };

                if (data) {
                    Msg.postData(res, false, '文章标题已存在！', '');
                } else {
                    ModelArticle.create(postDate, function(err, data) {

                        if (err) {
                            console.log(err);
                            Msg.postData(res, false, '系统错误', '');
                        } else {
                            Msg.postData(res, true, 'success', '/articlelist');
                        }
                    });
                };
            });
        }
        // post end
    }
};

// 查询文章
let show = {
    post(req, res, next) {
        let getParams = req.body,
            pageJson = {
                status: true,
                msg: 'success'
            };

        ModelArticle.find({ uid: getParams.uid }).count().exec((err, count) => {
            if (err) {
                Msg.postData(res, false, '系统错误', '');
            };
            getParams.page_count = getParams.page_count ? getParams.page_count : 1;
            if (getParams.cur_count > 1) {

                let getCount = (getParams.cur_count - 1) * getParams.page_count;
                console.log(getCount);

                ModelArticle.find({ uid: getParams.uid }, { title: 1, createTime: 1, author: 1 }).skip(getCount).limit(getParams.page_count).sort("-createTime").exec((err, data) => {
                    if (err) {
                        Msg.postData(res, false, '系统错误', '');
                    };

                    let newDate = [];
                    data.forEach((item) => {
                        let itemObj = {};
                        itemObj.date = moment(item.createTime).format('YYYY-MM-DD');
                        itemObj.address = item.title;
                        itemObj.name = item.author;
                        itemObj._id = item._id;
                        newDate.push(itemObj);
                    });

                    pageJson.data = {
                        list: newDate,
                        count: count,
                        page_count: getParams.page_count
                    }
                    res.json(pageJson);
                });

            } else {

                ModelArticle.find({ uid: getParams.uid }, { title: 1, createTime: 1, author: 1 }).limit(getParams.page_count).sort("-createTime").exec((err, data) => {
                    if (err) {
                        Msg.postData(res, false, '系统错误', '');
                    };

                    let newDate = [];
                    data.forEach((item) => {
                        let itemObj = {};
                        itemObj.date = moment(item.createTime).format('YYYY-MM-DD');
                        itemObj.address = item.title;
                        itemObj.name = item.author;
                        itemObj._id = item._id;
                        newDate.push(itemObj);
                    });

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
    }
};

let updata = {
    get(req, res, next) {
        let cid = req.query.cid;
        ModelArticle.findById({ _id: cid }, (err, doc) => {
            if (err) {
                Msg.postData(res, false, '系统错误', '');
            };
            Msg.postData(res, true, 'success', '', doc);
        });
    },
    post(req, res, next) {
        let postDate = {
            title: req.body.a_title,
            source: req.body.b_source,
            author: req.body.c_author,
            dynamicTags: req.body.dynamicTags,
            content: req.body.d_desc,
            uid: req.body.uid,
        };
    }
}

// 删除文章
let del = {
    post(req, res, next) {
        let _id = req.body._id;
        ModelArticle.findByIdAndRemove(_id, (err, doc) => {
            if (err) {
                Msg.postData(res, false, '系统错误', '');
            };

            Msg.postData(res, true, 'success', '',doc);
        });
    },
    all(req, res, next) {
        let getParams = req.body;
        console.log(getParams);
        ModelArticle.remove({ _id: { $in: getParams } }, (err, doc) => {
            if (err) {
                Msg.postData(res, false, '系统错误', '');
            };
            console.log(doc);
            Msg.postData(res, true, 'success', '', doc);
        });
    }
};

module.exports.article = article;
module.exports.show = show;
module.exports.del = del;
module.exports.updata = updata;