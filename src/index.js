/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-25 15:47:33
 * @文件说明: 全局$tool插件
 */
import VueMethods from './vue-methods.js'
import VueStorage from './vue-storage.js'
import ToolMethods from './tool-methods.js'

export default {
    install(
        Vue,
        storage = window.sessionStorage,
        prefix = 'tool_',
        router = ''
    ) {
        Vue.use(VueMethods, router)
        Vue.use(VueStorage, storage, prefix)

        const tool = Object.assign({}, ToolMethods)
        Vue.$tool = tool
        Vue.prototype.$tool = tool
    }
}
