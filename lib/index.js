/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-25 15:47:33
 * @文件说明: 全局$tool插件
 */
import VueMethods from './vue-methods.js';
import VueStorage from './vue-storage.js';
import ToolMethods from './tool-methods.js';

export default {
    install: function install(Vue) {
        var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.sessionStorage;
        var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'tool_';
        var router = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

        Vue.use(VueMethods, router);
        Vue.use(VueStorage, storage, prefix);

        var tool = Object.assign({}, ToolMethods);
        Vue.$tool = tool;
        Vue.prototype.$tool = tool;
    }
};