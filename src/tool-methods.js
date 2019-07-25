export default {
    // =======================正常使用的=======================
    // 对象深拷贝
    copy(obj, type = 'json') {
        let robj = {}
        if (type === 'json') robj = this.jsonCopy(obj)
        else robj = this.forinCopy(obj)
        return robj
    },
    // 序列化 深拷贝
    jsonCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    //  for in 深拷贝对象
    forinCopy(obj) {
        var result = Array.isArray(obj) ? [] : {}
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = forinCopy(obj[key]) //递归复制
                } else result[key] = obj[key]
            }
        }
        return result
    },
    // 将值转为%或rem
    rem(val) {
        return String(val).match('%') ? val : val / 37.5 + 'rem'
    },
    // 将值转为%或px
    px(val) {
        return String(val).match('%') ? val : val + 'px'
    },
    // =======================正常使用的=======================

    // =======================格式化的=======================
    // 日期格式化，默认为：当前时间的 YYYY-MM-DD HH:mm:ss 格式
    fdata(date = new Date(), fmt = 'YYYY-MM-DD HH:mm:ss') {
        if (!date) {
            return null
        }
        if (typeof date === 'string') {
            date = new Date(date.replace(/-/g, '/'))
        }
        if (typeof date === 'number') {
            date = new Date(date)
        }
        if (fmt === undefined) {
            return Number(date)
        } else {
            var o = {
                'M+': date.getMonth() + 1,
                'D+': date.getDate(),
                'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                S: date.getMilliseconds()
            }
            var week = {
                '0': '\u65e5',
                '1': '\u4e00',
                '2': '\u4e8c',
                '3': '\u4e09',
                '4': '\u56db',
                '5': '\u4e94',
                '6': '\u516d'
            }
            if (/(Y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                )
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (RegExp.$1.length > 1
                        ? RegExp.$1.length > 2
                            ? '\u661f\u671f'
                            : '\u5468'
                        : '') + week[date.getDay() + '']
                )
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1
                            ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length)
                    )
                }
            }
            return fmt
        }
    },
    // 将地址参数转为对象
    fquery(query = window.location.search.substr(1)) {
        let reg = /([^=&\s]+)[=\s]*([^&\s]*)/g
        let obj = {}
        while (reg.exec(query)) {
            obj[RegExp.$1] = RegExp.$2
        }
        return obj
    },
    // 金额格式化
    fprice(str = 0, tofixd = 2) {
        str = str + ''
        let newStr = ''
        let count = 0
        let fixd = new Array(tofixd).fill(0).join('')
        if (str.indexOf('.') === -1) {
            for (let i = str.length - 1; i >= 0; i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(i) + ',' + newStr
                } else {
                    newStr = str.charAt(i) + newStr
                }
                count++
            }
            str = newStr + '.' + fixd // 自动补小数点后两位
            return str
        } else {
            for (let i = str.indexOf('.') - 1; i >= 0; i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(i) + ',' + newStr
                } else {
                    newStr = str.charAt(i) + newStr // 逐个字符相接起来
                }
                count++
            }
            str =
                newStr +
                (str + fixd).substr((str + fixd).indexOf('.'), tofixd + 1)
            return str
        }
    },
    // 数量 以万为单位显示
    fnum(num) {
        num = Number(num)
        if (num) {
            if (num >= 10000) {
                num = (num / 10000).toFixed(2) + '万'
            }
        } else num = 0
        return num
    },
    // =======================格式化的=======================

    // =======================验证的=======================
    // 身份证格式验证
    checkCardID(cardID) {
        if (cardID.length === 18) {
            let reg = /^\d{17}[\d|X|x]$/
            return reg.test(cardID)
        } else if (cardID.length === 15) {
            let reg = /^\d{15}$/
            return reg.test(cardID)
        } else return false
    },
    // 身份证 中间用*显示
    hideCardID(cardid) {
        if (cardid) {
            return cardid.replace(/^(.{6})(?:\d+)(.{4})$/, '$1****$2')
        } else return ''
    },
    // 手机号格式验证
    checkPhone(phone) {
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        return reg.test(phone)
    },
    // 手机号，中间四位*显示
    hidePhone(phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },

    // 验证邮箱格式验证
    checkEmail(email) {
        let reg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/
        return reg.test(email)
    },
    // 验证值是否为空
    checkValEmpty(str) {
        if (str) {
            if (typeof str === 'object') {
                return Array.isArray(str)
                    ? str.length <= 0
                    : Object.keys(str).length <= 0
            } else return false
        } else return true
    },
    // 银行卡验证
    checkBankCard(iccid) {
        let initCard = iccid
        let s1 = 0
        let s2 = 0
        iccid = iccid.substring(0, iccid.length - 1)
        let reverse = ''
        for (let i = iccid.length; i > 0; i--) {
            reverse += iccid.charAt(i - 1)
        }
        for (let i = 0; i < reverse.length; i++) {
            let digit = parseInt(reverse.charAt(i), 10)
            if (i % 2 !== 0) {
                // this is for odd digits, they are 1-indexed in the
                // algorithm
                s1 += digit
            } else {
                // add 2 * digit for 0-4, add 2 * digit - 9 for 5-9
                s2 += 2 * digit
                if (digit >= 5) {
                    s2 -= 9
                }
            }
        }
        let sum = 10 - ((s1 + s2) % 10)
        if (sum === 10) {
            sum = 0
        }
        return iccid + sum === initCard
    }
    // =======================验证的=======================
}
