var Validator = (function() {
    function Validator() {
        this.cache = [];
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

    Validator.prototype.add = function(dom, rules) {
        console.log('add...');
        // console.log(rules);
        rules.forEach(function(obj) {
            var ruleArr = obj.rule.split(':');
            var errMsg = obj.errMsg;
            this.cache.push(function() {
                var rule = ruleArr.shift();
                ruleArr.unshift(dom);
                ruleArr.push(errMsg);
                return Validator.rules[rule].apply(dom, ruleArr);
            })
        }, this);
    };

    Validator.prototype.start = function() {
        console.log('start...');
        this.errMsgs = [];
        this.cache.forEach(function(validFunc) {
            var errMsg = validFunc();
            if (errMsg) {
                this.errMsgs.push(errMsg);
            } 
        }, this);
        return this.errMsgs;
    };

    return Validator;
})();

