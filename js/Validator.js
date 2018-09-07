var Validator = (function() {
    function Validator() {
        this.cache = {};
    }

    Validator.rules = {
        require: function(dom, errMsg) {
            if (dom.value.trim() === '') {
                return errMsg;
            }
        },
        minLength: function(dom, length, errMsg) {
            if (dom.value.trim().length < length) {
                return errMsg;
            }
        },
        mobile: function(dom, errMsg) {
            if (!/^[09]{2}[0-9]{8}$/.test(dom.value)) {
                return errMsg;
            }
        },
        email: function(dom, errMsg) {
            if (!/^[^\s]+@[^\s]+\.[^\s]{2,3}$/.test(dom.value)) {
                return errMsg;
            }
        },
        checked: function(dom, errMsg) {
            if (!dom.checked) {
                return errMsg
            }
        }
    };

    Validator.prototype.add = function(selector, rules) {        
        var dom = document.querySelector(selector);
        if (!dom) return;

        this.cache[selector] = [];
        
        rules.forEach(function(obj) {
            var ruleArr = obj.rule.split(':');
            var errMsg = obj.errMsg;
            var rule = ruleArr.shift();
            ruleArr.unshift(dom);
            ruleArr.push(errMsg);
            // console.log(rule);
            var fn = function() {
                return Validator.rules[rule].apply(dom, ruleArr);
            };
            this.cache[selector].push(fn)
        }, this);
    };

    Validator.prototype.start = function() {
        this.errMsgs = [];
        for (var key in this.cache) {
            if (this.cache.hasOwnProperty(key)) {
                var validFuncArr = this.cache[key];
                validFuncArr.forEach(function(validFunc) {
                    var errMsg = validFunc();
                    if (errMsg) {
                        this.errMsgs.push(errMsg);
                    } 
                }, this);
            }
        }
        return this.errMsgs;
    };

    return Validator;
})();

