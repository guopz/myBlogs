let ModelArticle = require("../model/article"),
    Msg = require("../model/msg");

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

        ModelArticle.findOne({ title: postDate.title }, function(err, data) {
            if (err) {
                console.log(err);
            };

            Msg.postMsg.status = false;

            if (data) {
                Msg.postMsg.msg = '文章标题已存在！';
                res.json(Msg.postMsg);
            } else {
                ModelArticle.create(postDate, function(err, data) {
                    if (err) {
                        Msg.postMsg.msg = '系统错误';
                        res.json(Msg.postMsg);
                    } else {
                        Msg.postMsg.status = true;
                        Msg.postMsg.msg = 'success';
                        res.json(Msg.postMsg);
                    }
                });
            };
        });
    }
};

module.exports.article = article;