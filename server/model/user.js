let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        unique: true // 禁止重复
    },
    password: String,
    alias: {
        type: String,
        unique: true // 禁止重复
    },
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

module.exports = mongoose.model('user', userSchema);