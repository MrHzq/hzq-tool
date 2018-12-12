/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2018-12-12 17:10:23
 * @文件说明: 全局$tool插件
 */
var validator = require('./validator.js')
module.exports = {
    install(Vue) {
        let tool = {
            ...validator
        }
        Vue.prototype.$tool = tool
        Vue.$tool = tool
    }
}
