/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2018-12-13 10:02:20
 * @文件说明: 全局$tool插件
 */
var validator = require('./validator.min.js')
module.exports = {
    install(Vue, prefix = 'xkt_') {
        let tool = Object.assign({}, validator)
        Vue.prototype.$tool = tool
        Vue.$tool = tool
        Vue.prototype.$getItem = key => {
            return JSON.parse(window.sessionStorage.getItem(prefix + key))
        }
        Vue.prototype.$setItem = (key, data) => {
            window.sessionStorage.setItem(prefix + key, JSON.stringify(data))
        }
        Vue.prototype.$copy = obj => JSON.parse(JSON.stringify(obj))
    }
}
