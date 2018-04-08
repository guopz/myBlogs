let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var blogSchema = new Schema({
    uid: {
        type: ObjectId,
        ref: 'user'
    },
    name: String,
    count: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 'success'
    },
    createTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('classify', blogSchema);