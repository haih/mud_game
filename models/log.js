var util = require('util');

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "S+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "s": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var logger = function() {
    if (!this instanceof logger) {
        return new logger();
    }
};
logger.prototype.init = function(wid) {
    this.wid = wid;
};
logger.prototype.log = function() {
    //console.log('[worker %d] %s  %s', this.wid, new Date().Format("yyyy-MM-dd hh:mm:SS:s"), util.format.apply(this, arguments));
    console.log('[worker %d] %s', this.wid, util.format.apply(this, arguments));
};

module.exports = new logger();
