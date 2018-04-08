let ModelArticle = require("../model/article"),
    ModelClassify = require("../model/classify"),
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
            classify: req.body.classify,
            digest: req.body.c_zy
        };
        // console.log(postDate);
        if (req.body.cid) {

            ModelArticle.updateOne({ _id: req.body.cid }, { $set: postDate }, (err, doc) => {
                if (err) {
                    console.log(err);
                    Msg.postData(res, false, '系统错误', '');
                };
                Msg.postData(res, true, 'success', '/home/articlelist');
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
                    let aid = postDate.classify.aid;
                    ModelArticle.create(postDate, function(err, data) {
                        if (err) {
                            console.log(err);
                            Msg.postData(res, false, '系统错误', '');
                        } else {
                            // console.log(aid);
                            ModelArticle.find({'classify.aid': aid}).count().exec((err, doc) => {
                                if (err) {
                                    console.log(err);
                                    Msg.postData(res, false, 'error');
                                };
                                // console.log('发布文章 ',doc, postDate);
                                ModelClassify.updateOne({_id: aid}, {$set: {count: doc}}).exec((err, doc)=>{
                                    if (err) {
                                        console.log(err);
                                        Msg.postData(res, false, 'error');
                                    };
                                    console.log('写入 ',doc);  
                                });
                                
                            });
                            Msg.postData(res, true, 'success', '/home/articlelist');
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
            
            // Find 参数
            getParams.page_count = getParams.page_count ? getParams.page_count : 8;
            getParams.cur_count = getParams.cur_count ? getParams.cur_count : 1;

            let param1 = { uid: getParams.uid },
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
    date(req, res, next) {
        let postParams = req.body;
        console.log(postParams);
        let fn = function(_data) {};

        ModelArticle.find({ uid: postParams.uid, updateTime: { $lte: postParams.date } }).sort("-updateTime").exec((err, doc) => {
            if (err) {
                console.log(err);
                Msg.postData(res, false, '系统错误', '');
            };
            console.log('Char 数据 \n',doc);
            let resJson = [],
                arrAll = {};
            doc.forEach((item) => {
                let temp = {};
                temp.updateTime = moment(item.updateTime).format('YYYY-MM-DD');
                resJson.push(temp);
            });

            resJson.forEach((item) => {
                let temp = item.updateTime;
                if (!arrAll[temp]) {
                    arrAll[temp] = 1;
                } else {
                    arrAll[temp]++;
                };
            });

            Msg.postData(res, true, 'success', '', arrAll);
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

            Msg.postData(res, true, 'success', '', doc);
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