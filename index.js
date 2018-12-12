/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2018-12-12 17:14:28
 * @文件说明: 全局$tool插件
 */
var validator = require('./validator.js')
module.exports = {
    install(Vue) {
        let tool = Object.assign({}, validator)
        Vue.prototype.$tool = tool
        Vue.$tool = tool
    }
}
