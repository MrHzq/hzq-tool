/*
 * @Author: hzq
 * @Date: 2019-07-25 15:28:31
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-25 15:46:27
 * @文件说明: 将会绑定到 Vue.prototype 的一些方法
 */
export default {
    install: function install(Vue) {
        var router = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        if (router) {
            // 页面后退
            Vue.prototype.$go = function () {
                return router.go(-1);
            };
            // 页面 push跳转
            Vue.prototype.$to = function (path) {
                var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                router.push({ path: path, query: query });
            };
            // 页面 replace跳转
            Vue.prototype.$tor = function (path) {
                var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                router.replace({ path: path, query: query });
            };
        }

        // 获取地址query id的数据
        Vue.prototype.$id = function (that) {
            return Number(that.$route.query.id) || 0;
        };

        // 获取地址query 对应key的数据，可以Number、String形式返回的，默认获取 id，返回0
        Vue.prototype.$query = function (that) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

            var _default = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var _r = that.$route.query[key];
            if (typeof _default === 'number') _r = Number(_r);
            return _r || _default;
        };
    }
};