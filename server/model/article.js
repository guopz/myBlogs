let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var blogSchema = new Schema({
    _uid: {
        type: ObjectId,
        ref: 'user'
    },
    author: String,
    source: String,
    title: String,
    content: String,
    dynamicTags: String,
});

module.exports = mongoose.model('article', blogSchema);