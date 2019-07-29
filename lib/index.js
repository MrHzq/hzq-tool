/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-29 14:05:10
 * @文件说明: 全局$tool插件
 */
import VueMethods from './vue-methods.js';
import VueStorage from './vue-storage.js';
import ToolMethods from './tool-methods.js';

export default {
    install: function install(Vue) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var defaultConfig = {
            storage: 'session',
            prefix: 'tool_',
            router: ''
        };

        var _Object$assign = Object.assign({}, defaultConfig, config),
            router = _Object$assign.router,
            storage = _Object$assign.storage,
            prefix = _Object$assign.prefix;

        Vue.use(VueMethods, router);

        var currStorage = window.sessionStorage;
        if (storage === 'local') currStorage = window.localStorage;
        if (storage) Vue.use(VueStorage, currStorage, prefix);

        var tool = Object.assign({}, ToolMethods);
        Vue.$tool = tool;
        Vue.prototype.$tool = tool;
    }
};