# Validator
form validator

* 增加最大字數規則(maxLength:number)
* 一個欄位的錯誤訊息現在只會出現一次，依照填寫的 rule 順序判斷

# Example
```html
<div>
    姓名:<input id="txtName" type="text">
</div>
<div>
    手機:<input id="txtPhone" type="tel">
</div>
<div>
    電郵:<input id="txtEmail" type="text">
</div>
<div>
    發票:<input id="txtInvoice" type="text">
</div>
<div>
    身份証:<input id="txtId" type="text">
</div>
<div>
    <input id="cbAgree" type="checkbox">我已同意使用條款
</div>
<input id="btnSubmit" type="button" value="submit">

<script src="js/Validator.js"></script>
```

```javascript
let btnSubmit = document.getElementById('btnSubmit');

function checkForm() {
    let validator = new Validator();
    validator.add('#txtName', [
        {
            rule: 'require',
            errMsg: '請填寫姓名' 
        },
        {
            rule: 'minLength:3',
            errMsg: '姓名長度不可小於3位' 
        },
        {
            rule: 'maxLength:10',
            errMsg: '姓名長度不可大於10位' 
        },
    ]);
    validator.add('#txtPhone', [
        {
            rule: 'require',
            errMsg: '請填寫手機' 
        },
        {
            rule: 'mobile',
            errMsg: '請輸入正確手機格式 09開頭' 
        },
    ]);
    validator.add('#txtEmail', [
        {
            rule: 'require',
            errMsg: '請填寫 email' 
        },
        {
            rule: 'email',
            errMsg: '請輸入正確 email 格式 aa@bb.com' 
        },
    ]);
    validator.add('#txtInvoice', [
        {
            rule: 'require',
            errMsg: '請填寫發票' 
        },
        {
            rule: 'invoice',
            errMsg: '請輸入正確發票格式 AB12345678' 
        },
    ]);
    validator.add('#txtId', [
        {
            rule: 'require',
            errMsg: '請填寫身份証' 
        },
        {
            rule: 'twId',
            errMsg: '請輸入正確身份証格式 A123456789' 
        },
    ]);
    validator.add('#cbAgree', [
        {
            rule: 'checked',
            errMsg: '請同意使用條款' 
        }
    ]);

    let errMsgs = validator.start();
    return errMsgs;
}

btnSubmit.addEventListener('click', function(e) {
    let errMsgs = checkForm();
    if (errMsgs.length > 0) {
        alert(errMsgs.join('\n'));
    } else {
        alert('pass');
    }
});
```