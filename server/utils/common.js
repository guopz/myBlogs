/*
 * @Author: GH 
 * @Date: 2018-03-12 12:01:12 
 * @Last Modified by: GH
 * @Last Modified time: 2018-03-12 14:16:10
 */

var silly = require('silly-datetime');
var utils = {
    log: function(_log) {
        console.log('[' + _log + '] loading', silly.format(new Date(), 'YYYY-MM-DD HH:mm'));
    }
};

module.exports = utils;