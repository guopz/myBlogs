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

            ModelArticle.update({cid: req.body.cid}, postDate, (err, doc) => {
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
    }
};

// 查询文章
let show = {
    post(req, res, next) {
        let uid = req.body.uid;
        ModelArticle.find({ uid: uid }, { title: 1, createTime: 1, author: 1 }, (err, data) => {
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
            // console.log(newDate);
            Msg.postData(res, true, 'success', '', newDate);
        });
    }
};

let updata = {
    get(req, res, next) {
        let cid = req.query.cid;
        ModelArticle.findById( { _id : cid } , (err, doc) => {
            if(err) {
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

            Msg.postData(res, true, 'success');
        });
    }
};

module.exports.article = article;
module.exports.show = show;
module.exports.del = del;
module.exports.updata = updata;