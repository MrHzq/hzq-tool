/*
 * @Author: hzq
 * @Date: 2019-07-25 15:13:02
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-25 15:46:02
 * @文件说明: storage的相关处理，将会绑定到 Vue.prototype 上面
 * 默认值 storage：window.sessionStorage；prefix：tool
 */
export default {
    install: function install(Vue, storage, prefix) {
        // 检查 是否能够写入Storage
        var canWriteStorage = function canWriteStorage() {
            try {
                storage.setItem('@@', 1);
                storage.removeItem('@@');
                return true;
            } catch (e) {
                return false;
            }
        };
        if (!canWriteStorage()) {
            throw new Error('Invalid Storage：该浏览器不支持Storage，可能原因：浏览器版本过低、处于无痕模式等等');
        }

        // storage 设置一项
        var setItem = function setItem(key, data) {
            storage.setItem(prefix + key, JSON.stringify(data));
        };

        // storage 获取一项
        var getItem = function getItem(key) {
            return JSON.parse(storage.getItem(prefix + key));
        };

        // storage 移除一项
        var removeItem = function removeItem(key) {
            storage.removeItem(prefix + key);
        };

        // storage 移除一项或多项
        var clearItem = function clearItem(key) {
            if (typeof key === 'string') removeItem(key);else if (Array.isArray(key) && key.length) {
                key.map(function (k) {
                    return removeItem(k);
                });
            }
        };

        // storage 移除所有项
        var clearItemAll = function clearItemAll() {
            return storage.clear();
        };

        Vue.prototype.$getItem = getItem;
        Vue.prototype.$setItem = setItem;
        Vue.prototype.$removeItem = removeItem;
        Vue.prototype.$clearItem = clearItem;
        Vue.prototype.$clearItemAll = clearItemAll;
    }
};