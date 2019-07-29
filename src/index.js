/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-29 14:05:10
 * @文件说明: 全局$tool插件
 */
import VueMethods from './vue-methods.js'
import VueStorage from './vue-storage.js'
import ToolMethods from './tool-methods.js'

export default {
    install(Vue, config = {}) {
        const defaultConfig = {
            storage: 'session',
            prefix: 'tool_',
            router: ''
        }
        const { router, storage, prefix } = Object.assign(
            {},
            defaultConfig,
            config
        )
        Vue.use(VueMethods, router)

        let currStorage = window.sessionStorage
        if (storage === 'local') currStorage = window.localStorage
        if (storage) Vue.use(VueStorage, currStorage, prefix)

        const tool = Object.assign({}, ToolMethods)
        Vue.$tool = tool
        Vue.prototype.$tool = tool
    }
}
