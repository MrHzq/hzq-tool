/*
 * @Author: hzq
 * @Date: 2019-07-25 15:28:31
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-25 15:46:27
 * @文件说明: 将会绑定到 Vue.prototype 的一些方法
 */
export default {
    install(Vue, router = '') {
        if (router) {
            // 页面后退
            Vue.prototype.$go = () => router.go(-1)
            // 页面 push跳转
            Vue.prototype.$to = (path, query = {}) => {
                router.push({ path, query })
            }
            // 页面 replace跳转
            Vue.prototype.$tor = (path, query = {}) => {
                router.replace({ path, query })
            }
        }

        // 获取地址query id的数据
        Vue.prototype.$id = that => Number(that.$route.query.id) || 0

        // 获取地址query 对应key的数据，可以Number、String形式返回的，默认获取 id，返回0
        Vue.prototype.$query = (that, key = 'id', _default = 0) => {
            let _r = that.$route.query[key]
            if (typeof _default === 'number') _r = Number(_r)
            return _r || _default
        }
    }
}
