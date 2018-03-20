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
    dynamicTags: [],
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('article', blogSchema);