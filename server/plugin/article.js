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
                        Msg.postData(res, true, 'success', '/basetable');
                    }
                });
            };
        });
    }
};

let show = {
    post(req, res, next) {
        let uid = req.body.uid;
        // 查询用户发布文章
        ModelArticle.find({ uid: uid }, (err, data) => {
            if (err) {
                Msg.postData(res, false, '系统错误', '');
            };
            console.log(data);
            Msg.postData(res, true, 'success', '', data);
        });
    }
}

module.exports.article = article;
module.exports.show = show;