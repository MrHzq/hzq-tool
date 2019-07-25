var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

export default {
    // =======================正常使用的=======================
    // 对象深拷贝
    copy: function copy(obj) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'json';

        var robj = {};
        if (type === 'json') robj = this.jsonCopy(obj);else robj = this.forinCopy(obj);
        return robj;
    },

    // 序列化 深拷贝
    jsonCopy: function jsonCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    //  for in 深拷贝对象
    forinCopy: function (_forinCopy) {
        function forinCopy(_x2) {
            return _forinCopy.apply(this, arguments);
        }

        forinCopy.toString = function () {
            return _forinCopy.toString();
        };

        return forinCopy;
    }(function (obj) {
        var result = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
                    result[key] = forinCopy(obj[key]); //递归复制
                } else result[key] = obj[key];
            }
        }
        return result;
    }),

    // 将值转为%或rem
    rem: function rem(val) {
        return String(val).match('%') ? val : val / 37.5 + 'rem';
    },

    // 将值转为%或px
    px: function px(val) {
        return String(val).match('%') ? val : val + 'px';
    },

    // =======================正常使用的=======================

    // =======================格式化的=======================
    // 日期格式化，默认为：当前时间的 YYYY-MM-DD HH:mm:ss 格式
    fdata: function fdata() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
        var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

        if (!date) {
            return null;
        }
        if (typeof date === 'string') {
            date = new Date(date.replace(/-/g, '/'));
        }
        if (typeof date === 'number') {
            date = new Date(date);
        }
        if (fmt === undefined) {
            return Number(date);
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
            };
            var week = {
                '0': '\u65E5',
                '1': '\u4E00',
                '2': '\u4E8C',
                '3': '\u4E09',
                '4': '\u56DB',
                '5': '\u4E94',
                '6': '\u516D'
            };
            if (/(Y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '\u661F\u671F' : '\u5468' : '') + week[date.getDay() + '']);
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
            return fmt;
        }
    },

    // 将地址参数转为对象
    fquery: function fquery() {
        var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search.substr(1);

        var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
        var obj = {};
        while (reg.exec(query)) {
            obj[RegExp.$1] = RegExp.$2;
        }
        return obj;
    },

    // 金额格式化
    fprice: function fprice() {
        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var tofixd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

        str = str + '';
        var newStr = '';
        var count = 0;
        var fixd = new Array(tofixd).fill(0).join('');
        if (str.indexOf('.') === -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(i) + ',' + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + '.' + fixd; // 自动补小数点后两位
            return str;
        } else {
            for (var _i = str.indexOf('.') - 1; _i >= 0; _i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(_i) + ',' + newStr;
                } else {
                    newStr = str.charAt(_i) + newStr; // 逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + fixd).substr((str + fixd).indexOf('.'), tofixd + 1);
            return str;
        }
    },

    // 数量 以万为单位显示
    fnum: function fnum(num) {
        num = Number(num);
        if (num) {
            if (num >= 10000) {
                num = (num / 10000).toFixed(2) + '万';
            }
        } else num = 0;
        return num;
    },

    // =======================格式化的=======================

    // =======================验证的=======================
    // 身份证格式验证
    checkCardID: function checkCardID(cardID) {
        if (cardID.length === 18) {
            var reg = /^\d{17}[\d|X|x]$/;
            return reg.test(cardID);
        } else if (cardID.length === 15) {
            var _reg = /^\d{15}$/;
            return _reg.test(cardID);
        } else return false;
    },

    // 身份证 中间用*显示
    hideCardID: function hideCardID(cardid) {
        if (cardid) {
            return cardid.replace(/^(.{6})(?:\d+)(.{4})$/, '$1****$2');
        } else return '';
    },

    // 手机号格式验证
    checkPhone: function checkPhone(phone) {
        var reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        return reg.test(phone);
    },

    // 手机号，中间四位*显示
    hidePhone: function hidePhone(phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },


    // 验证邮箱格式验证
    checkEmail: function checkEmail(email) {
        var reg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
        return reg.test(email);
    },

    // 验证值是否为空
    checkValEmpty: function checkValEmpty(str) {
        if (str) {
            if ((typeof str === 'undefined' ? 'undefined' : _typeof(str)) === 'object') {
                return Array.isArray(str) ? str.length <= 0 : Object.keys(str).length <= 0;
            } else return false;
        } else return true;
    },

    // 银行卡验证
    checkBankCard: function checkBankCard(iccid) {
        var initCard = iccid;
        var s1 = 0;
        var s2 = 0;
        iccid = iccid.substring(0, iccid.length - 1);
        var reverse = '';
        for (var i = iccid.length; i > 0; i--) {
            reverse += iccid.charAt(i - 1);
        }
        for (var _i2 = 0; _i2 < reverse.length; _i2++) {
            var digit = parseInt(reverse.charAt(_i2), 10);
            if (_i2 % 2 !== 0) {
                // this is for odd digits, they are 1-indexed in the
                // algorithm
                s1 += digit;
            } else {
                // add 2 * digit for 0-4, add 2 * digit - 9 for 5-9
                s2 += 2 * digit;
                if (digit >= 5) {
                    s2 -= 9;
                }
            }
        }
        var sum = 10 - (s1 + s2) % 10;
        if (sum === 10) {
            sum = 0;
        }
        return iccid + sum === initCard;
    }
    // =======================验证的=======================

};