/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2018-12-14 17:29:25
 * @文件说明: 全局$tool插件
 */
import validator from './validator.min.js'
export default {
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
